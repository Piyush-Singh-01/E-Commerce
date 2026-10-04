import axiosInstance from "./axios";

export const createRazorpayOrder = async () => {
    return axiosInstance.post("/payment/create-order");
};

export const verifyRazorpayPayment = async (paymentData) => {
    return axiosInstance.post("/payment/verify", paymentData );
};

export const createBuyNowOrder  = async ({productId, quantity}) => {
    return axiosInstance.post("/payment/create-buy-now-order", {productId, quantity} );
};

export const saveFailedPayment = (data) => {
    return axiosInstance.post("/payment/failed", data );
};