import axiosInstance from "./axios";

export const getCart = async()=>{
    return axiosInstance.get('/cart');
}

export const addToCart = async(productId)=>{
    return axiosInstance.post(`/cart/${productId}`)
}

export const updateCartQuantity = async({productId, quantity})=>{
    return axiosInstance.patch(`/cart/${productId}`, {quantity});
}

export const removeFromCart = async(productId)=>{
    return axiosInstance.delete(`/cart/${productId}`);
}

export const clearCart = async()=>{
    return axiosInstance.delete('/cart');
}