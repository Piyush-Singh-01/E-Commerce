import { Link } from "react-router-dom";
import {Star } from "lucide-react";


export const ProductCard = ({ product, getDiscount}) => {
    const discount = getDiscount(product.price, product.discountPrice);
    return (
      <Link
        to={`/product/${product._id}`}
        className="bg-white flex-none w-[240px] rounded-2xl overflow-hidden group border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.images[0].url}
            alt={product.productName}
            className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 truncate group-hover:text-gray-900">
            {product.productName}
          </h3>

          {/* <div className="flex items-center gap-1 mt-2 text-sm text-amber-500">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            <span className="text-gray-600 font-medium">{product.rating}</span>
          </div> */}

          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold text-gray-900">
              ₹{product.discountPrice}
            </span>
            {product.price !== product.discountPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  };