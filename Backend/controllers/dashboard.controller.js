const User = require("../models/auth.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const getDashboardData = async(req, res)=>{
    try {
        const currentYear = new Date().getFullYear();

        const startOfYear = new Date(currentYear, 0, 1);

        const startOfNextYear = new Date(currentYear + 1, 0, 1);

        const [totalSalesResult, totalOrders, totalUsers, totalProducts, salesResult, ordersResult, recentOrders] = await Promise.all([
            
            // Total Sales
            Order.aggregate([
                {
                    $match:{
                        paymentStatus: 'paid'
                    }
                },
                {
                    $group: {
                        _id : null,
                        total: {
                            $sum: "$totalAmount"
                        }
                    }
                }
            ]),

            // Total Orders  
            Order.countDocuments(),
            
            // Total Users
            User.countDocuments(),
            
            // Total Products
            Product.countDocuments(),
            
            // Sales Overview
            Order.aggregate([
                {
                    $match: {
                        paymentStatus: "paid",
                        createdAt: {
                            $gte: startOfYear,
                            $lt: startOfNextYear
                        }
                    }
                },
                {
                    $group: {
                        _id : {
                            $month: "$createdAt"
                        },
                        sales : {
                           $sum: "$totalAmount"
                        }
                    }
                },
                {
                    $sort: {
                        "_id" : 1
                    }
                }
            ]),

            // Order Overview
            Order.aggregate([
                {
                    $group: {
                        _id: "$orderStatus",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]),

            // Recent Orders
            Order.find().populate("user", "username email")
                        .populate("items.product", "productName images price discountPrice")
                        .sort({createdAt: -1})
                        .limit(5)
        ])
        
        // Fromat Total Sales
        const totalSales = totalSalesResult[0]?.total || 0;
        
        // Format Sales Overview
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const salesOverview = monthNames.map((month, index) => {
            
            const monthData = salesResult.find(item => item._id === index + 1);

            return {month, sales: monthData?.sales || 0}
        })

        // Format Orders Overview
        const ordersOverview = ordersResult.map(item => ({
            name: item._id,
            value: item.count
        }))

        return res.status(200).json({success: true,
            data: {
              summary: {
                    totalSales,
                    totalOrders,
                    totalUsers,
                    totalProducts
                },
                salesOverview,
                ordersOverview,
                recentOrders
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        return res.status(500).json({success: false, message: "Failed to load dashbaord data"});
    }
}

module.exports = {getDashboardData}