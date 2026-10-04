import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://e-commerce-hfj2.onrender.com/api",
    withCredentials: true
});

export default axiosInstance;



