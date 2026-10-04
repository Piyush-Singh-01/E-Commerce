import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import useWishlist from "../../../hooks/useWishlist";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProductGallery({ images = [], productName, productId }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const {handletoggleWishlist, fetchWishlist} = useWishlist();

  const wishlist = useSelector((state) => state.wishlist?.wishlist || []);

  const isFavorite = wishlist.some((product) => productId?.toString() === product?._id?.toString());

  const imageUrls = images.map((image) => image.url);

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? imageUrls.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === imageUrls.length - 1 ? 0 : current + 1
    );
  };

  const {isAuthenticated} = useAuth();

  const navigate = useNavigate();

  if (!images.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
        No image available
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        <img
          src={imageUrls[selectedImage]}
          alt={productName}
          className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-[1.02]"
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => {
                    if(isAuthenticated){
                        handletoggleWishlist(productId)
                    }else{
                        navigate(`/login?redirect=/product/${productId}`);
                    }
                  }
                }
          // onClick={() => handletoggleWishlist(productId)}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full cursor-pointer bg-white shadow-md transition hover:scale-105"
          aria-label="Add to wishlist"
        >
          <FaHeart
            size={17}
            className={isFavorite ? "text-red-500" : "text-gray-400 transition hover:text-red-500"}
          />
        </button>

        {/* Previous */}
        {imageUrls.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            className="absolute left-2 sm:left-3 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer bg-white/90 text-gray-700 shadow-md transition opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft size={13} />
          </button>
        )}

        {/* Next */}
        {imageUrls.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2 sm:right-3 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center cursor-pointer rounded-full bg-white/90 text-gray-700 shadow-md transition opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white z-10"
            aria-label="Next image"
          >
            <FaChevronRight size={13} />
          </button>
        )}

        {/* Image Counter */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 rounded-full bg-black/70 px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-white">
            {selectedImage + 1} / {imageUrls.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex w-full gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {images.map((image, index) => (
          <button
            key={image._id || image.public_id}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-gray-50 transition ${
              selectedImage === index
                ? "border-gray-900"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={image.url}
              alt={`${productName} ${index + 1}`}
              className="h-full w-full object-contain p-1 cursor-pointer"
            />

            {selectedImage === index && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;