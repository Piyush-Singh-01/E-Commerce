const mongoose = require("mongoose");

const paymentAttemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        razorpayOrderId: {
            type: String,
            required: true,
            unique: true
        },

        items: [
            {
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
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        source: {
            type: String,
            enum: ["cart", "buy_now"],
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "failed"],
            default: "pending"
        },

        failureReason: {
            type: String,
            default: null
        },

        expiresAt: {
            type: Date,
            required: true
        }

    }, { timestamps: true});

paymentAttemptSchema.index( { expiresAt: 1 }, { expireAfterSeconds: 0 });

const PaymentAttempt = mongoose.model("PaymentAttempt", paymentAttemptSchema);

module.exports = PaymentAttempt;