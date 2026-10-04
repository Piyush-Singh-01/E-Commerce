const Product = require("../models/product.model");

const Wishlist = require("../models/wishlist.model");

const getWishlist = async(req, res)=>{
    try {
        let wishlist = await Wishlist.findOne({user: req.user.id}).populate("products");
        
        if(!wishlist){
            wishlist =  await Wishlist.create({user: req.user.id, products:[]});
        }

        return res.status(200).json({success: true, wishlist});

    } catch (error) {
        console.error("Get wishlist error", error);
        return res.status(500).json({success: false, message: 'Failed to get wishlist', error});
    }
}

const toggleWishlist = async(req, res)=>{
    try {
        const {productId} = req.params;

        if(!productId){
            return res.status(404).json({success: false, message: "Product ID is requried"});
        }

        let product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }

        let wishlist = await Wishlist.findOne({user: req.user.id});

        if(!wishlist){
            wishlist = new Wishlist({user: req.user.id, products: []})
        }

        const alreadyExists = wishlist.products.find((id)=> id.toString() === productId);

        if(alreadyExists){

            wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
            
            await wishlist.save();

            await wishlist.populate("products");

            return res.status(200).json({success: true, message: "Product removed from wishlist", wishlist}); 
        }

        wishlist.products.push(productId);

        await wishlist.save();

        await wishlist.populate("products");

        return res.status(200).json({success: true, message: "Product add to wishlist", wishlist});

    } catch (error) {
        console.log("Add wishlist error", error);

        return res.status(500).json({success: false, message: "Failed to add product to wishlist", error});
    }
}

const removeFromWishlist = async(req, res)=>{
    try {
        const {productId} = req.params;

        if(!productId){
            return res.status(404).json({success: false, message: "Product Id is required"});
        }

        const wishlist = await Wishlist.findOne({user: req.user.id});

        if(!wishlist){
            return res.status(404).json({success: false, message: "Wishlist not found"});
        }

        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);

        await wishlist.save();

        await wishlist.populate("products");

        return res.status(200).json({success: true, message: "Product removed from wishlist", wishlist});
    } catch (error) {
        console.error("Remvoe wishlist error", error);

        return res.status(500).json({success: false, message: "Failed to remove from wishlist", error});
    }
}

const clearWishlist = async(req, res)=>{

  try {
     const wishlist = await Wishlist.findOne({user: req.user.id});

     if(!wishlist){
        return res.status(404).json({success: false, message: "Wishlist not found"});
     }

     wishlist.products = [];

     await wishlist.save();

     return res.status(200).json({success: true, message: "Wishlist cleared successfully"});

  } catch (error) {
    console.error("Clear wishlist error:" ,error);

    return res.status(500).json({success: false, message: "Failed to clear wishlist", error});
  }  

}

module.exports = {getWishlist, toggleWishlist, removeFromWishlist, clearWishlist};
