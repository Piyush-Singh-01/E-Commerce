const razorpay = require("../config/razorpay");
const Cart = require("../models/cart.model");
const crypto = require("crypto");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose  = require("mongoose");
const PaymentAttempt = require("../models/paymentAttempt.model");

const createRazorpayOrder = async(req, res)=>{
    try {
        const cart = await Cart.findOne({user: req.user.id}).populate("items.product");
        
        if(!cart || cart.items.length === 0){
            return res.status(400).json({success: false, message: "Cart is empty"});
        }

        let totalAmount = 0;

        for(const item of cart.items){
            
            if(!item.product){
                return res.status(404).json({success: false, message: "Product not found"});
            }

            if(item.quantity > item.product.stock){
                return res.status(400).json({success: false, message: `Only ${item.product.stock} units available for ${item.product.productName}`});
            }

            totalAmount += item.product.discountPrice * item.quantity

            totalAmount = Math.round(totalAmount);
        }

        const options = {
            amount : totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const razorpayOrder = await razorpay.orders.create(options);

        const paymentAttempt = new PaymentAttempt({

            user: req.user.id,

            items: cart.items.map((item)=>({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.discountPrice,
            })),

            totalAmount,

            source: "cart",

            status: "pending",

            razorpayOrderId: razorpayOrder.id,

            expiresAt: new Date(Date.now() + 10 * 60 * 1000),

        })

        await paymentAttempt.save();

        return res.status(200).json({success: true, message: "Razorpay order created", order: razorpayOrder});

    } catch (error) {
        
        console.error("Create cart Razorpay order error:", error);

        return res.status(500).json({success: false, message: "Failed to create Razorpay order", error});
    }
}

const createBuyNowOrder = async(req, res)=>{
    try {
        const {productId, quantity = 1} = req.body;

        if(!productId || !quantity){
            return res.status(400).json({success: false, message: "Product ID and quantity are required"});
        }

        if(!Number.isInteger(quantity) || quantity < 1){
            return res.status(400).json({success: false, message: "Quantity must be at least 1"});
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({success: false, message: "Product not found"});
        }

        if(quantity > product.stock){
            return res.status(400).json({success: false, message: `Only ${product.stock} units available`});
        }

        const totalAmount = Math.round(product.discountPrice * quantity);

        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100,

            currency: "INR",

            receipt: `buy_now_${Date.now()}`
        });

        const paymentAttempt = new PaymentAttempt({

            user: req.user.id,

            items:[
                {
                    product: product._id,
                    quantity,
                    price: product.discountPrice
                }
            ],

            totalAmount,

            source: "buy_now",

            status: "pending",

            razorpayOrderId: razorpayOrder.id,

            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await paymentAttempt.save();

        console.log('PAYMENT ATTEMPT CREATED:', paymentAttempt);

        return res.status(200).json({success: true, message: "Buy Now order created", order: razorpayOrder});

    } catch (error) {
        
        console.log("Created Buy Now order error:", error);

        return res.status(500).json({success: false, message: "Failed to create Buy Now order", error});
    }
}

const verifyRazorpayPayment = async(req, res)=>{

    const session = await mongoose.startSession();

    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(400).json({success: false, message: "Payment details are required"});
        }

        const existingOrder = await Order.findOne({
            user: req.user.id,
            razorpayOrderId: razorpay_order_id,
        });

        if(existingOrder){
            return res.status(200).json({success: false, message: "Payment already verified", order: existingOrder});
        }

        // if(order.paymentStatus === "expired"){
        //     return res.status(400).json({success: false, message: "Payment window has expired"});
        // }

        // if(paymentAttempt.paymentStatus === "paid"){
        //     return res.status(200).json({success: true, message: "Payment already verified", order});
        // }

        const paymentAttempt = await PaymentAttempt.findOne({
            user: req.user.id,

            razorpayOrderId: razorpay_order_id
        })

        if(!paymentAttempt){
            return res.status(404).json({success: false, message: "Payment attempt not found or expired"});
        }

        if(paymentAttempt.status === "failed"){
            return res.status(400).json({success: false, message: "Payment attempt has already failed"});
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if(!isValid){
            return res.status(400).json({success: false, message: "Invalid payment signature"});
        }

        const payment = await razorpay.payments.fetch(razorpay_payment_id);


        // Verify payment belongs to this order
        if(payment.order_id !== paymentAttempt.razorpayOrderId){
            return res.status(400).json({success: false, message: "Payment does not belong to this order"});
        }

        const expectedAmount = Math.round(paymentAttempt.totalAmount * 100);

        if(expectedAmount !== payment.amount){
            return res.status(400).json({success: false, message: "Payment amount mismatch"});
        }

        if(payment.currency !==  "INR"){
            return res.status(400).json({success: false, message: "Invalid payment currency"});
        }

        if(payment.status !== "captured"){
            return res.status(400).json({success: false, messaage: "Payment was not captured"});
        }
   
        // Start MongoDb transcation  
        session.startTransaction();

        // Decrease product stock
        for(const item of paymentAttempt.items){
             
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id : item.product,
                
                    stock: {$gte : item.quantity}
                },
                {
                    $inc: { stock : -item.quantity}  // inc means increament/decreament                    
                },
                {
                    new : true, session
                }
            );

            if(!updatedProduct){
                throw new Error(`Insufficient stock or failed to update stock for product ${item.product}`);
            }
        }

        const order = new Order({

            user : req.user.id,
            
            items: paymentAttempt.items,

            totalAmount: paymentAttempt.totalAmount,

            source: paymentAttempt.source,

            paymentStatus: "paid",

            orderStatus: "confirmed",

            razorpayOrderId: razorpay_order_id,

            razorpayPaymentId: razorpay_payment_id,

            razorpaySignature: razorpay_signature

        })

        await order.save({session});

        if(order.source === "cart"){
            
          const cart = await Cart.findOne({ user: req.user.id }).session(session);

            if(!cart) throw new Error("Cart not found");

            cart.items = cart.items.filter((cartItem)=>{

                const orderedItem = paymentAttempt.items.find((item)=> item.product.toString() === cartItem.product.toString());

                if(!orderedItem) return true;

                cartItem.quantity -= orderedItem.quantity;

                return cartItem.quantity > 0;
                    
            });

            await cart.save({session});
        }

        //Delete temporary payment attempt
        await PaymentAttempt.deleteOne({_id: paymentAttempt._id}, {session});
 
        // Commit Transaction
        await session.commitTransaction();

        return res.status(200).json({success: true, message: "Payment verified successfully", order});

    } catch (error) {

        if(session.inTransaction()){
            await session.abortTransaction();
        }
        console.error("Payment verification error:", error);

        return res.status(500).json({success: false, message: "Payment verification failed"});
  
    }finally{
        await session.endSession();
    }
}

const saveFailedPayment = async(req, res)=>{
    try {
        const {razorpay_order_id, reason} = req.body;

        if(!razorpay_order_id){
            return res.status(400).json({success: false, message: "Razorpay order ID is required"});
        }

        const paymentAttempt = await PaymentAttempt.findOne({
            user: req.user.id,
            razorpayOrderId: razorpay_order_id
        })

        if(!paymentAttempt){
             return res.status(404).json({success: false, message: "Payment attempt not found"});
        }

        if(paymentAttempt.status === "failed"){
            return res.status(400).json({success: false, message: "Payment attempt alredy failed"});
        }

        paymentAttempt.status = "failed";

        paymentAttempt.failureReason = reason || "Payment failed";

        await paymentAttempt.save();

        return res.status(200).json({success: true, message: "Payment marked as failed"});

    } catch (error) {
        console.error("failed payment error:", error);

        return res.status(500).json({ success: false,  message: "Failed to save payment attempt"});
    }
}


module.exports = {createRazorpayOrder, createBuyNowOrder, verifyRazorpayPayment, saveFailedPayment};