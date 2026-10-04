const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items:[{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],

    totalAmount:{
        type: Number,
        required: true,
        min: 0
    },

    source: {
        type: String,
        enum: ["cart", "buy_now"],
        required: true
    },

    paymentStatus:{
        type: String,
        enum: ["paid", "failed"],
        default: "paid"
    },

    orderStatus:{
        type: String,
        enum: ["confirmed", "processing", "shipped","out for delivery", "delivered", "cancelled", "returned"],
        default: "confirmed"
    },

    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },

    razorpayPaymentId: {
        type: String,
        required: true
    },

    razorpaySignature:{
        type: String,
        default: true,
    },

    // paymentExpiresAt: {
    //     type: Date,
    //     required: true
    // },
    
    cancelledAt:{
        type: Date,
        default: null
    },

    cancellationReason:{
        type: String,
        default: null
    }

}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;