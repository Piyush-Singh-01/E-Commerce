import {FaCheck, FaMinus, FaPlus, FaShoppingBag, FaShoppingCart, FaStar, FaTruck, FaUndo, FaShieldAlt} from "react-icons/fa";
import useCart from '../../../hooks/useCart';
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePayment from "../../../hooks/usePayment";

function ProductInfo({product, discountPercentage}) {

  const {handleAddToCart} = useCart();

  const { handleBuyNow  } = usePayment();

  const cart = useSelector((state)=>state.cart.cart );
  
  const navigate = useNavigate();

  const isAdded = cart?.items?.some((item) => item.product?._id === product?._id );

  const isOutOfStock = product?.stock <= 0;

  const handleCartClick = () => {

    if (isAdded) {
      navigate("/cart");
      return;
    }

    handleAddToCart(product._id);
  };

  return (
    <div className="flex flex-col">

      {/* Brand / Category */}
      <div className="flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
          {product?.category}
        </span>

        <span className="text-sm text-gray-400">{product?.brand}</span>

      </div>

      {/* Product Name */}
      <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-950 sm:text-3xl md:text-4xl break-words">
        {product?.productName}
      </h1>

      {/* Product ID */}
      <p className="mt-2 text-xs text-gray-400 break-all">
        Product ID: {product?._id}
      </p>

      {/* RATING */}
      <div className="mt-5 flex flex-wrap items-center gap-3">

        {product?.rating > 0 ? (
          <>
            <div className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white">
              <span>{product?.rating}</span>
              <FaStar size={12} />
            </div>

            <span className="text-sm text-gray-500">
              Customer rating
            </span>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-1 text-gray-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} size={14} />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              No ratings yet
            </span>

          </div>
        )}

      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-200 w-full" />

      {/* PRICE */}
      <div>

        <div className="flex flex-wrap items-baseline gap-3">

          <span className="text-3xl font-bold text-gray-950 sm:text-4xl">
            ₹ {product?.discountPrice?.toLocaleString("en-IN")}
          </span>

          <span className="text-lg text-gray-400 line-through">
            ₹ {product?.price?.toLocaleString("en-IN")}
          </span>

          {discountPercentage > 0 && (
            <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-bold text-green-700 whitespace-nowrap">
              {discountPercentage}% OFF
            </span>
          )}

        </div>

        <p className="mt-2 text-xs text-gray-500">
          Inclusive of all taxes
        </p>

      </div>

      {/* ABOUT PRODUCT */}
      <div className="mt-7">

        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
          About this product
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-600 break-words">
          {product?.description}
        </p>

      </div>

      {/* STOCK */}
      <div className="mt-6 w-full rounded-xl border border-gray-200 bg-gray-50 p-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isOutOfStock
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <FaCheck size={13} />
            </div>

            <div>

              <p
                className={`text-sm font-semibold ${
                  isOutOfStock
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </p>

              {!isOutOfStock && (
                <p className="mt-0.5 text-xs text-gray-500">
                  {product?.stock} units available
                </p>
              )}

            </div>

          </div>

          {!isOutOfStock && product?.stock < 10 && (
            <span className="text-xs font-semibold text-orange-600">
              Hurry! Only {product?.stock} left
            </span>
          )}

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-7 grid gap-3 grid-cols-1 sm:grid-cols-2">

        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleCartClick}
          disabled={isOutOfStock}
          className={`flex min-h-[52px] w-full items-center justify-center gap-2 cursor-pointer rounded-xl border text-sm font-semibold transition ${
            isAdded
              ? "border-green-600 bg-green-50 text-green-700"
              : "border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isAdded ? (
            <>
              <FaCheck size={14} />
              Go to Cart
            </>
          ) : (
            <>
              <FaShoppingCart size={15} />
              Add to Cart
            </>
          )}
        </button>

        {/* Buy Now */}
        <button
          type="button"
          onClick={()=> handleBuyNow({productId: product._id, quantity: 1, onSuccess: () => navigate("/orders")})}
          disabled={isOutOfStock}
          className="flex min-h-[52px] w-full items-center justify-center gap-2 cursor-pointer rounded-xl bg-gray-950 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaShoppingBag size={14} />
          Buy Now
        </button>

      </div>

      {/* SERVICE FEATURES */}
      <div className="mt-8 grid gap-4 border-t border-gray-200 pt-6 grid-cols-1 min-[450px]:grid-cols-3">

        {/* Delivery */}
        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
            <FaTruck size={14} />
          </div>

          <div>

            <p className="text-xs font-semibold text-gray-900">
              Free Delivery
            </p>

            <p className="mt-1 text-[11px] leading-4 text-gray-500">
              Fast & secure delivery
            </p>

          </div>

        </div>

        {/* Returns */}
        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
            <FaUndo size={13} />
          </div>

          <div>

            <p className="text-xs font-semibold text-gray-900">
              Easy Returns
            </p>

            <p className="mt-1 text-[11px] leading-4 text-gray-500">
              Hassle-free returns
            </p>

          </div>

        </div>

        {/* Security */}
        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
            <FaShieldAlt size={14} />
          </div>

          <div>

            <p className="text-xs font-semibold text-gray-900">
              Secure Purchase
            </p>

            <p className="mt-1 text-[11px] leading-4 text-gray-500">
              Safe & reliable
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductInfo;