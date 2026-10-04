const express = require("express");

const {getCart, addToCart, updateCartQuantity, removeFromCart, clearCart} = require("../controllers/cart.controller");
const protect = require("../middleware/protect");

const router = express.Router();


router.get('/', protect, getCart);

router.post('/:productId', protect, addToCart);

router.patch("/:productId", protect, updateCartQuantity);

router.delete("/:productId", protect, removeFromCart);

router.delete("/", protect, clearCart);

module.exports = router;


