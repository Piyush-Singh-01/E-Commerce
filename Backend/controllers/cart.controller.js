const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCart = async(req, res)=>{
    try {
        let cart = await Cart.findOne({user: req.user.id}).populate("items.product");

        if(!cart){
            cart = await Cart.create({user: req.user.id, items:[]});
        } 

        return res.status(200).json({success: true, cart});

    } catch (error) {
        console.error("Get Cart error", error);

        return res.status(500).json({success: false, message: "Failed to get cart"});
    }
}

const addToCart = async(req, res)=>{
    try {
        const {productId} = req.params;


        if(!productId){
            return res.status(400).json({success: false, message: "Product Id is required"});
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }

        if(product.stock <= 0){
            return res.status(400).json({success: false, message: "Product is out of stock"});
        }

        let cart = await Cart.findOne({user: req.user.id});

        if(!cart){
            cart = new Cart({user: req.user.id, items: []});
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if(existingItem) {
            const newQuantity = existingItem.quantity + 1;
            
            if(newQuantity > product.stock){
                return res.status(400).json({success: false, message:`Only ${product.stock} units available`});
            }
            existingItem.quantity += 1;    

        }else{
            cart.items.push({product: productId, quantity : 1});
        }

        await cart.save();

        await cart.populate("items.product");

        return res.status(200).json({success: true, message: "Product added to cart", cart});

    } catch (error) {
        console.error("Add to cart error", error);

        return res.status(500).json({success: false, message: "Failed to add product to cart", error});
    }
}

const updateCartQuantity = async(req, res)=>{
    try {
        const {productId} = req.params;

        const {quantity} = req.body;

        if(!Number.isInteger(quantity) || quantity < 1){
            return res.status(400).json({success: false, message: "Quantiy must be integer"});
        }

        if(quantity < 1){
            return res.status(400).json({success: false, message: "Quantiy must be at least 1"});
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({success: false, message: "Product not found"})
        }

        if(quantity > product.stock){
            return res.status(400).json({success: false, message:`Only ${product.stock} units available`});
        }

        const cart = await Cart.findOne({user: req.user.id});

        if(!cart){
            return res.status(404).json({success: false, message:"Cart not found"});
        }

        const item = cart.items.find((item) => item.product.toString() === productId );

        if(!item){
            return res.status(404).json({success: false, message: "Product not found in cart"});
        }

        item.quantity = quantity;

        await cart.save();

        await cart.populate("items.product");

        return res.status(200).json({success: true, message: "Cart updated successfully", cart});


    } catch (error) {
        console.error("Update cart error", error);
        return res.status(500).json({success: false, message: "Failed to update cart", error});
    }
}

const removeFromCart = async(req, res)=>{

  try {
    const {productId} = req.params;

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({success: false, message: "Product not Found"})
    }

    const cart = await Cart.findOne({user: req.user.id});

    if(!cart){
        return res.status(404).json({success: false, message: "Cart not found"});
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    
    await cart.populate("items.product");

    return res.status(200).json({success: true, message: "Product removed from cart", cart});
 
} catch (error) {

    console.error("Remove cart item error", error);

    return res.status(500).json({success: false, message: "Failed to remove product", error});
  }

}

const clearCart = async(req, res)=>{

  try {
     const cart = await Cart.findById({user: req.user.id});

     if(!cart){
        return res.status(404).json({success: false, message: "Cart not found"});
     }

     cart.items = [];

     await cart.save();

     return res.status(200).json({success: true, message: "Cart cleared successfully", cart});

  } catch (error) {
    console.error("Clear cart error:" ,error);

    return res.status({success: false, message: "Failed to clear cart", error});
  }  

}

module.exports = {getCart, addToCart, updateCartQuantity, removeFromCart, clearCart}