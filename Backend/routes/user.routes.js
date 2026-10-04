const express = require("express");

const getAllUsers = require("../controllers/user.controller");

const protect = require("../middleware/protect");
const adminOnly = require("../middleware/admin");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

module.exports = router;