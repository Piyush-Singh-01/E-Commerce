import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import useWishlist from "../../../hooks/useWishlist";
import { FaRegHeart } from "react-icons/fa";

const WishlistPage = () => {

  const wishlist = useSelector((state)=> state.wishlist.wishlist);
 
  const {fetchWishlist, handleRemoveFromWishlist, handleClearWishlist } = useWishlist();

  useEffect(()=>{
    fetchWishlist();
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      
        <div className="w-24 h-24 cursor-pointer bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
           <FaRegHeart className="h-12 w-12" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          Explore our items and save your favorite products to your wishlist so
          you can easily find them later.
        </p>
        <Link 
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        <button
          onClick={() => handleClearWishlist()}
          className="text-sm cursor-pointer text-red-600 hover:text-red-700 font-medium hover:underline flex items-center gap-1"
        >
          <span><RiDeleteBin5Line /></span>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const discountPercentage = Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
          );

          return (
            <div
              key={product._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 cursor-pointer backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                title="Remove from wishlist"
              >
               <IoCloseSharp />
              </button>

              {discountPercentage > 0 && (
                <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {discountPercentage}% OFF
                </span>
              )}

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.images[0]?.url || "/placeholder.jpg"}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{product.brand}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      ★ {product.rating}
                    </span>
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="font-semibold text-gray-800 line-clamp-1 hover:text-indigo-600 transition-colors"
                  >
                    {product.productName}
                  </Link>

                  {/* Stock Availability */}
                  <div className="mt-2 mb-3">
                    {product.stock > 0 ? (
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.discountPrice.toLocaleString("en-IN")}
                    </span>
                    {product.price > product.discountPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      product.stock > 0
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md active:scale-95"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {product.stock > 0 ? "Move to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;