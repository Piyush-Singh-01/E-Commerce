const express = require("express");

const { getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/order.controller");

const router = express.Router();

const protect = require("../middleware/protect");

const adminOnly = require("../middleware/admin");


router.get("/my-orders", protect, getUserOrders);

router.get("/admin/all-orders", protect, adminOnly, getAllOrders);

router.patch("/admin/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;