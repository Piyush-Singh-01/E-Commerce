const express = require("express");

const {getWishlist, toggleWishlist, removeFromWishlist, clearWishlist} = require( "../controllers/wishlist.controller.js");

const protect = require("../middleware/protect");

const router = express.Router();


router.get("/", protect, getWishlist);

router.post("/:productId", protect, toggleWishlist);

router.delete("/:productId", protect, removeFromWishlist);

router.delete("/", protect, clearWishlist);

module.exports = router;