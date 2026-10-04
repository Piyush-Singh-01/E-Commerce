import axiosInstance from "./axios";

export const loginUser = async (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const signupUser = async (data) => {
  return axiosInstance.post("/auth/signup", data);
};

export const logoutUser = async () => {
  return axiosInstance.post("/auth/logout");
};

export const getCurrentUser = async () => {
  return axiosInstance.get("/auth/me");
};

// export const refreshToken = async () => {
//   return axiosInstance.post("/auth/refresh-token");
// };