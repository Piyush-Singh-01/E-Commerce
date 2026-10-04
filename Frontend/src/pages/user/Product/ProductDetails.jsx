import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

import ProductGallery from "../../../component/client/product/ProductGallery";
import RelatedProducts from "../../../component/client/product/RelatedProducts";
import ProductInfo from "../../../component/client/product/ProductInfo";

import useProduct from "../../../hooks/useProduct";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useWishlist from "../../../hooks/useWishlist";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

function ProductDetails() {

  const { productId } = useParams();

  const {fetchWishlist} = useWishlist();

  const loading = useSelector((state) => state.product.isLoading);
  
  const products = useSelector((state)=> state.product.products);
  
  const {getSingleProduct, getAllProducts} = useProduct();

  const {fetchCart} = useCart();

  const {isAuthenticated} = useAuth();

  const [product, setProduct] = useState(null);

  useEffect(()=> {
     const loadProduct = async()=>{
        try {
          const response = await getSingleProduct(productId);

          await getAllProducts();

          if(isAuthenticated){
            await fetchCart();
          }

          setProduct(response)

        } catch (error) {
          toast.error(error.response?.message || "Failed to load product");
        }
     }
     loadProduct();

  }, [productId, isAuthenticated]);

  useEffect(()=>{
      if(!isAuthenticated){
         return;
      }
      fetchWishlist();
  }, [isAuthenticated]);

  const relatedProduct = product ? (products.filter((item) =>  item?.category.toLowerCase() === product?.category.toLowerCase())) : [];

  const discountPercentage = useMemo(() => {
    if (!product?.price || !product?.discountPrice) {
      return 0;
    }

    return Math.round(((product?.price - product?.discountPrice) / product?.price) * 100 );

  }, [product?.price, product?.discountPrice]);


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center w-full px-4 text-center">
        <p className="text-sm text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-10 w-full min-w-0 overflow-x-hidden bg-gray-50">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">

          <Link to="/" className="text-gray-500 transition hover:text-gray-900">
              Home
          </Link>

          <span className="text-gray-300">/</span>

          <Link to="/product" className="text-gray-500 transition hover:text-gray-900">
             Products
          </Link>

          <span className="text-gray-300">/</span>

          <span className="font-medium capitalize text-gray-900 break-words line-clamp-1">
            {product?.productName}
          </span>

        </div>

        {/* BACK TO PRODUCTS */}
        <Link to="/product"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-950"
        >
          <FaArrowLeft size={12} />
          Back to Products
        </Link>

        {/*  MAIN PRODUCT SECTION */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

            {/* PRODUCT GALLERY */}
            <div className="w-full overflow-hidden">

              <ProductGallery 
                    images={product?.images} 
                    productName={product?.productName}
                    productId = {productId}
              />

            </div>

            {/*  PRODUCT INFORMATION */}
            <ProductInfo
                product={product}
                discountPercentage={discountPercentage}
            />
          </div>
        </div>

        {/* PRODUCT DESCRIPTION */}
        <section className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="border-b border-gray-200 pb-5">

            <h2 className="text-xl font-bold text-gray-950">
              Product Description
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Everything you need to know about this product
            </p>

          </div>

          <div className="mt-6">

            <p className="max-w-5xl text-sm leading-8 text-gray-600 break-words">
              {product?.description}
            </p>

          </div>

        </section>

        {/*  PRODUCT INFORMATION */}
        <section className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="border-b border-gray-200 pb-5">

            <h2 className="text-xl font-bold text-gray-950">
              Product Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Specifications and product details
            </p>

          </div>

          <div className="mt-6 w-full overflow-hidden rounded-xl border border-gray-200">

            {/* Brand */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Brand
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm font-semibold text-gray-900">
                {product?.brand}
              </div>

            </div>

            {/* Category */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Category
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm font-semibold capitalize text-gray-900">
                {product?.category}
              </div>

            </div>

            {/* MRP */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                MRP
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm text-gray-900">
                ₹{product?.price?.toLocaleString("en-IN")}
              </div>

            </div>

            {/* Selling Price */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Selling Price
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm font-bold text-gray-900">
                ₹{product?.discountPrice?.toLocaleString("en-IN")}
              </div>

            </div>

            {/* Stock */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Available Stock
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm text-gray-900">
                {product?.stock} units
              </div>

            </div>

            {/* Rating */}
            <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Rating
              </div>

              <div className="px-4 py-3 sm:px-5 sm:py-4 text-sm text-gray-900">
                {product?.rating > 0 ? `${product?.rating} / 5`: "No ratings yet"}
              </div>

            </div>

            {/* Product ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2">

              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 text-sm font-medium text-gray-500">
                Product ID
              </div>

              <div className="break-all px-4 py-3 sm:px-5 sm:py-4 text-sm text-gray-600">
                {product?._id}
              </div>

            </div>

          </div>

        </section>

        {/* RELATED PRODUCTS */}
        <RelatedProducts relatedProducts={relatedProduct}/>


      </div>
    </div>
  );
}

export default ProductDetails;