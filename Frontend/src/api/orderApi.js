import axiosInstance from "./axios";

export const getUserOrders = () => {
    return axiosInstance.get("/order/my-orders");
};

export const getAllOrders = () => {
    return axiosInstance.get("/order/admin/all-orders");
};

export const updateOrderStatus = (id, orderStatus) => {
    return axiosInstance.patch( `/order/admin/${id}/status`,  { orderStatus } );
};