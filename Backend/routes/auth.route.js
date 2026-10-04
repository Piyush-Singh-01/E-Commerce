const express = require("express");

const {Signup, Login, Logout, getUser} = require("../controllers/auth.controller");
const protect = require("../middleware/protect")

const router = express.Router();

router.get("/me", protect, getUser)
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;