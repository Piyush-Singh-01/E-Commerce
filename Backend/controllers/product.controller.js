const { JSONCookies } = require('cookie-parser');
const Product = require('../models/product.model');
const uploadOnCloudinary = require('../utils/uploadOnCloudinary');
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");
const InventoryHistory = require('../models/inventoryHistory.model');

const getAllProduct = async(req, res)=>{
    try {
        const products = await Product.find();
        return res.status(200).json({success: true, products})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error", error})
    }
}

const getSingleProduct = async(req, res)=>{
     try {
        const product = await Product.findById(req.params.id);

        if(!product) return res.status(400).json({success: false, message: "Product Not Found"})
        
        return res.status(200).json({success: true, product})
     } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
     }
}

const createProduct = async(req, res)=>{
      try {
        const {productName, brand, category, price, discountPrice, stock, description} = req.body;
        console.log(req.body);

        if (!productName || !brand || !category || !price || !discountPrice || !stock || !description) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory",
            });
}
        const files = req.files || [];

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image",
            });
        }

        const imageUrls = [];

        for(let file of files){
            const uploadedImage = await uploadOnCloudinary(file.path);
          
            if(uploadedImage) imageUrls.push({url: uploadedImage.secure_url, public_id: uploadedImage.public_id});
        }
        
        const product = await Product.create({productName, brand, category, price: Number(price), discountPrice: Number(discountPrice), stock: Number(stock), description, images: imageUrls, createdAt: new Date()})

        return res.status(201).json({success: true, message: "Product created successfully", product})
      } catch (error) {
        return res.status(500).json({success: false, message: "Create Product Error", error});
      }
}

const deleteProduct = async(req, res)=>{
     try {
        const id = req.params.id;

        const response = await Product.findByIdAndDelete(id);

        if(!response){
            return res.status(404).json({success: false, message: "Product Not Found"})
        }

        return res.status(200).json({success: true, message:"Product deleted successfull", product: response})
     } catch (error) {
        return res.status(500).json({success: false, message: "Error in removing product", error});
     }
} 

const deleteInventoryHistory = async(req, res)=>{
    try {
        const response = await InventoryHistory.findByIdAndDelete(req.params.id);

        if(!response) return res.status(404).json({success: false, message: "History Not Found"});

        return res.status(200).json({success: true, message: "Stock History deleted successfully", product: response});
    } catch (error) {
        return res.status(500).json({success: false, messsage: "Internal Server Error", error});
    }
}

const getAllInventoryHistory = async(req, res)=>{
        try {
            const history = await InventoryHistory.find({product: req.params.id}).sort({createdAt: -1});
           
            if(history.length === 0) return res.status(404).json({success: false, message: "History Not Found"})
        
            return res.status(200).json({success: true, message: "History get Successfully", history})
        } catch (error) {
            console.log("Error getting inventory history:", error);
            return res.status(500).json({success: false, message: "Something went wrong while getting history", error})
        }

}

const udpateProductStock = async(req, res)=>{
    try {
        const id = req.params.id;
        const {stock} = req.body;

        console.log(req.body);

        const product = await Product.findById(id);

        if(!product) return res.status(404).json({success: false, message: "Product Not Found"});

        if(Number(stock) < 0) return res.status(400).json({success: false, message: "Quantity must be greater than 0"})

        const updatedProduct = await Product.findByIdAndUpdate(id, {stock}, {new: true});
         
        await InventoryHistory.create({
            product: product._id,
            operation: stock > product.stock ? "Added" : "Removed",
            quantity: Math.abs(stock - product.stock),
            previousStock: product.stock,
            newStock: stock,
        })

        return res.status(200).json({success: true, product: updatedProduct, message: "Stock updated successfully" })
    } catch (error) {
        console.log("Error in udpateProductStock", error);
        return res.status(500).json({success: false, message: "Error in Updating stock", error})
    }
}
    
const updateProduct = async(req, res)=>{
     try {

        const product = await Product.findById(req.params.id);

        if(!product) return res.status(404).json({success: false, message: "Product Not Found"})
            
        const {productName, brand, category, price, discountPrice, stock, description, existingImages} = req.body;

        const updatedData = {
            productName,
            brand,
            category,
            price: Number(price),
            discountPrice: Number(discountPrice),
            stock: Number(stock),
            description
        }

        let finalImages = [];

        if(existingImages){
            const images = Array.isArray(existingImages) ? existingImages : [existingImages]

            finalImages = images.map((img)=> JSON.parse(img));
        }

        const removedImages = product.images.filter((oldImage)=>{
            return !finalImages.some((newImage)=> newImage.public_id === oldImage.public_id)
        })

        for(let image of removedImages){
             await deleteFromCloudinary(image.public_id);
        }

        if(req.files && req.files.length > 0){

              for(let file of req.files){
                  const uploadedImages = await uploadOnCloudinary(file.path);

                  if(uploadedImages){
                      finalImages.push({url: uploadedImages.secure_url, public_id: uploadedImages.public_id});
                  }
              }
        }

        updatedData.images = finalImages;

        const uploadedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, {new: true});
        
        return res.status(200).json({success: true, message: "Product Updated Successfully", product:uploadedProduct});


     } catch (error) {
        console.log("Error in updateProuct", error);
        return res.status(500).json({success: false, message: error || "Internal Server Error"})
     }
}

module.exports = {getAllProduct, getSingleProduct, createProduct, deleteProduct,deleteInventoryHistory, updateProduct, udpateProductStock, getAllInventoryHistory}