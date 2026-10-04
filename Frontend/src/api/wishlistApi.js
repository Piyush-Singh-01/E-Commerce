import axiosInstance from "./axios";

export const getWishlist = async()=>{
    return axiosInstance.get('/wishlist');
}

export const toggleWishlist  = async(productId)=>{
    return axiosInstance.post(`/wishlist/${productId}`);
}

export const removeFromWishlist  = async(productId)=>{
    return axiosInstance.delete(`/wishlist/${productId}`);
}

export const clearWishlist = async()=>{
    return axiosInstance.delete('/wishlist');
}

