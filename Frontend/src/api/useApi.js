import axiosInstance from "./axios";

export const getAllUsers = (page = 1, limit = 10, search = "")=>{
    return axiosInstance.get("/admin/users",
        {
            params: { page, limit, search}
        }
  );
}


