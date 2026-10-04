const Order = require("../models/order.model");
const PaymentAttempt = require("../models/paymentAttempt.model");

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
        .populate("items.product", "productName images price discountPrice").sort({ createdAt: -1 });

      if(!orders){
        return res.status(404).json({success: false, message: "Order Not found"});
      }

      const paymentAttempts = await PaymentAttempt.find({ user: req.user.id })
        .populate("items.product", "productName images price discountPrice").sort({ createdAt: -1 });

      return res.status(200).json({success: true, orders, paymentAttempts});

  } catch (error) {

    console.error("Get user orders error:", error);

    return res.status(500).json({success: false, message: "Failed to fetch orders", error });
  } 
};

const getAllOrders = async(req, res)=>{
    try {
       const orders = await Order.find()
            .populate("user", "username email")
            .populate("items.product", "productName images price discountPrice")
            .sort({createdAt: -1});

       return res.status(200).json({success: true, orders})
       
    } catch (error) {
       console.error("Get all orders error", error);

       return res.status(500).json({success: false, message: "Failed to fetch orders"});
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const allowedStatuses = [
            "confirmed",
            "processing",
            "shipped",
            "out for delivery",
            "delivered",
            "cancelled",
            "returned"
        ];

        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({ success: false, message: "Invalid order status"});
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ success: false,  message: "Order not found" });
        }
       
        order.orderStatus = orderStatus;

        await order.save();

        return res.status(200).json({success: true, message: "Order status updated successfully", order });

    } catch (error) {

        console.error("Update order status error:", error);

        return res.status(500).json({success: false, message: "Failed to update order status" });
    }
};


module.exports = { getUserOrders, getAllOrders, updateOrderStatus };