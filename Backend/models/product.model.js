const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
      productName: {
         type: String,
         required:true
      },
       category: {
         type: String,
         required:true
      },
       price: {
         type: Number,
         required:true
      },
       discountPrice: {
         type: Number,
         required:true
      },
       stock: {
         type: Number,
         required:true,
         default: 0
      },
      brand:{
        type: String,
        required: true
      },
       description: {
         type: String,
         required:true
      },
       rating:{
         type: Number,
         default: 0
      },
      images: [{
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
      }],
      isTrending: {
        type: Boolean,
        default: false
      },
      soldCount: {
        type: Number,
        default: 0
      } 
           
      //  isActive:{
      //   type: Boolean,
      //   default: false
      // },
      // createdAt:{
      //    type: Date,
      //    default: null
      // },
      // updatedAt:{
      //    type: Date,
      //    default: null
      // }
      
},{ timestamps:true})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
