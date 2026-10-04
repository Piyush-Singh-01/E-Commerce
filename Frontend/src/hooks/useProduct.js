import { createProduct,fetchSingleProduct, fetchAllProducts,fetchAllStockHistory, updateProductById, updateStockById, deleteProductById, deleteInventoryHistoryById } from "../api/productApi";
import {useDispatch} from 'react-redux';
import { setProducts , addProductState, setLoading, updateProductState, deleteProductState} from "../redux/slice/productSlice";

const useProduct = ()=>{
    const dispatch = useDispatch();
    
    const getAllProducts = async()=>{
        try {
            const response =  await fetchAllProducts();
            
            dispatch(setProducts(response.products));
        } catch (error) {
            console.log("Error fetching products:", error);
            throw error;
        }    
    }

    const getAllStockHistory = async(id)=>{
         try {
            const response = await fetchAllStockHistory(id);
               return response;
         } catch (error) {
            console.log("Error in getting Stock Inventory History", error);
            throw error;
         }
    }

    const getSingleProduct = async(id)=>{
        try {
            dispatch(setLoading(true));
            const response =  await fetchSingleProduct(id);
            return response.product;
        } catch (error) {
            console.log("Error fetching product:", error);
            throw error;
        }finally{
            dispatch(setLoading(false));
        }     
    }

    const createNewProduct = async(productData)=>{
        try {
            dispatch(setLoading(true));
            const response = await createProduct(productData);
            dispatch(addProductState(response.product));
            return response.product;
          } catch (error) {
               console.log("Error creating product:", error);
               throw error;
          }finally{
               dispatch(setLoading(false));
          }
    }

    const updateExistingProduct = async(id, productData)=>{
        try {
            dispatch(setLoading(true));
            const response = await updateProductById(id, productData);
            dispatch(updateProductState(response.product));
            return response;
          } catch (error) {
            console.log("Error updating product", error);
            throw error;
          }finally{
            dispatch(setLoading(false));
          }
    }

    const updateProductStock = async(id, stockData)=>{
        try {
            dispatch(setLoading(true));
            const response = await updateStockById(id, stockData);
            // dispatch(updateProductState(response.product.))
            console.log("updateStock",response);
            return response;
        } catch (error) {
            console.log("Error in Updating Stock", error);
            throw error;
        }finally{
            dispatch(setLoading(false));
        }
    }

    const deleteExistingProduct = async(id)=>{
        try {
            const response = await deleteProductById(id);
            dispatch(deleteProductState(response.product));
          } catch (error) {
            console.log("Error deleting product", error);
            throw error;
          }
    }

    const deleteInventoryHistory = async(id)=>{
          try {
             const response = await deleteInventoryHistoryById(id);
             
          } catch (error) {
              console.log("Error in Deleting Invtory History", error);
              throw error;
          }
    }

    return {getAllProducts, getSingleProduct, getAllStockHistory, createNewProduct, updateExistingProduct,updateProductStock, deleteExistingProduct, deleteInventoryHistory};
}

export default useProduct;


