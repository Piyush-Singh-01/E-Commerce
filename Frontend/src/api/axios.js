import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true
});

// const axiosInstance = axios.create({
//     baseURL: "http://locahost:3000/api",
//     withCredentials: true
// });

export default axiosInstance;





