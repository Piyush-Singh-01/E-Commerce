const User = require("../models/auth.model");

const getAllUsers = async(req, res)=>{
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

        const search = req.query.search?.trim() || "";

        const skip = (page - 1) * limit;

        const filter = {role: {$ne: "admin"}};

        if(search){
            filter.$or = [
              {
                username: {
                   $regex : search,
                   $options: "i"
                }
              },
              {
                email: {
                    $regex: search,
                    $options: "i"
                }
              }
          ];
        }
        
        const [users, totalUsers] = await Promise.all([

            User.aggregate([
                // filter users
                {
                    $match : filter
                },
                // Find orders belonging to each user
                {
                    $lookup: {
                        from: "orders",
                        localField: "_id",
                        foreignField: "user",
                        as: "orders"
                    }
                },
                // Paid + valid order status
                {
                    $addFields: {
                        orders: {
                          $filter: {
                            input: "$orders",
                            as: "order",
                            cond: {
                                $and:[
                                    {
                                        $eq : ["$$order.paymentStatus", "paid"]
                                    },
                                    {
                                        $in:[
                                            "$$order.orderStatus",
                                            [
                                                "confirmed", "processing", "shipped", "delivered"
                                            ]
                                        ]
                                    }
                                ]
                            }
                          }   
                        }
                    }
                },
                {
                    $addFields:{
                        orders:{
                            $size: "$orders"
                        }
                    }
                },
                // Don't send password
                {
                    $project: {
                        password: 0
                    }
                },
                // Newest users first
                {
                    $sort:{
                        createdAt: -1
                    }
                },
                // Pagination
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]),
             
             User.countDocuments(filter)
     
        ])

        const totalPages = Math.ceil(totalUsers/limit);

        return res.status(200).json({success: true, users, pagination: {currentPage: page, limit, totalUsers, totalPages}});

    } catch (error) {
        console.error("Get all users error: ", error);

        return res.status(500).json({success: false, message: "Failed to fetch users"});
    }
}

module.exports = getAllUsers