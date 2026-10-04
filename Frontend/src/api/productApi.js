import axiosInstance from "./axios";

export const fetchAllProducts = async()=>{
     const response = await axiosInstance.get("/product");
           return response.data;
}

export const fetchSingleProduct = async(id)=>{
     const response = await axiosInstance.get(`/product/${id}`);
           console.log(response.data);
           return response.data;
}

export const fetchAllStockHistory = async(id)=>{
      const response = await axiosInstance.get(`/product/stock-history/${id}`);
            return response.data;
}

export const createProduct = async(productData)=>{
    console.log(productData);
    const response = await axiosInstance.post("/product/create", productData,
              {
                 headers: {
                     "Content-Type" : "multipart/form-data"
                 }
              },
            );
             console.log(response);
             return response.data;
}

export const updateProductById = async(id, productData)=>{
    const response = await axiosInstance.put(`/product/update/${id}`, productData);
            console.log(response);
            return response.data;
}

export const updateStockById = async(id, stock)=>{
    console.log("productApi", id, stock);
    const response = await axiosInstance.patch(`/product/update-stock/${id}`, stock);
          console.log(response);
          return response.data;
}

export const deleteProductById = async(id)=>{
     const response = await axiosInstance.delete(`/product/delete/${id}`);
           return response.data;
}

export const deleteInventoryHistoryById = async(id)=>{
      const response =  await axiosInstance.delete(`/product/delete-history/${id}`);
            return response.data; 
}