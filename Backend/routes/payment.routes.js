const express = require("express");

const {createRazorpayOrder, createBuyNowOrder, verifyRazorpayPayment, saveFailedPayment} = require("../controllers/payment.controller");

const protect = require("../middleware/protect");

const router = express.Router();

router.post("/create-order", protect,createRazorpayOrder);

router.post("/create-buy-now-order", protect, createBuyNowOrder);

router.post("/verify", protect, verifyRazorpayPayment);

router.post("/failed", protect, saveFailedPayment);

module.exports = router;