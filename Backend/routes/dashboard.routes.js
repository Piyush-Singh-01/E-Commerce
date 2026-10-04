const express = require("express");

const {getDashboardData} = require("../controllers/dashboard.controller");

const protect = require("../middleware/protect");
const adminOnly = require("../middleware/admin");

const router = express.Router();

router.get("/", protect, adminOnly, getDashboardData);

module.exports = router;