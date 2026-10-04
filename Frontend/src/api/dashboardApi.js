import axiosInstance from "./axios";

export const getDashboardData = ()=>{
    return axiosInstance.get("/dashboard");
}


