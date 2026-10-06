import React from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RelatedProducts({relatedProducts}) {

  const navigate = useNavigate()

  return (
    <section className="mt-10 w-full">

      {/*  HEADER  */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end justify-between">

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            More to explore
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">
            You May Also Like
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Similar products you might be interested in
          </p>
        </div>

        <button
          type="button"
          className="hidden text-sm font-semibold text-gray-700 transition hover:text-gray-950 sm:block shrink-0"
        >
          View All
        </button>

      </div>

      {/*  PRODUCT GRID  */}

      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

        {relatedProducts.map((product) => {

          const discountPercentage = Math.round(((product.price - product.discountPrice) /  product.price) * 100);
 
          return (
            <div key={product._id}
                 onClick={()=> navigate(`/product/${product._id}`)}
                 className="group flex flex-col overflow-hidden cursor-pointer rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/*  IMAGE  */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">

                <img
                  src={product.images?.[0]?.url}
                  alt={product.productName}
                  className="h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Discount */}
                {discountPercentage > 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                    -{discountPercentage}%
                  </span>
                )}

              </div>

              {/*  CONTENT  */}
              <div className="flex flex-1 flex-col p-4">

                {/* Category */}
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {product.category}
                </p>

                {/* Name */}
                <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-gray-900 break-words">
                  {product.productName}
                </h3>

                {/* Rating */}
                {/* <div className="mt-3 flex items-center gap-2">

                  <span className={`flex items-center gap-1 rounded ${product.rating ? "bg-green-400 text-white" : "bg-gray-200 text-black"} px-2 py-1 text-xs font-semibold`}>
                    {product.rating  ? product.rating : "No Review"}
                    <FaStar size={9} />
                  </span>

                  <span className="text-xs text-gray-400">
                    {product.rating ? "Customer rating" : ""}
                  </span>

                </div> */}

                {/* Price */}
                <div className="mt-1 flex flex-wrap items-baseline gap-2">

                  <span className="text-base font-bold text-gray-950">
                    ₹{product.discountPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Mobile View All */}
      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-950 sm:hidden"
      >
        View All Products
      </button>

    </section>
  );
}

export default RelatedProducts;