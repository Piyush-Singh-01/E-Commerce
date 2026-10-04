import { useDispatch} from "react-redux";
import { setCart, clearCartState, setLoading} from "../redux/slice/cartSlice";
import { addToCart, getCart, updateCartQuantity, clearCart, removeFromCart } from "../api/cartApi";
import {toast} from 'react-toastify';

const useCart = ()=>{

  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      dispatch(setLoading(true));

      const response = await getCart();

      if(response?.data?.cart){
        dispatch(setCart(response.data.cart));
      }

    } catch (error) {
        console.log("Error in Fetching Cart:", error);

        toast.error(error.response?.data?.message || "Failed to fetch cart");
    }finally{
        dispatch(setLoading(false));
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      dispatch(setLoading(true));
      
      const response = await addToCart(productId);
      
      if(response?.data?.cart){
        dispatch(setCart(response.data.cart));
      }
      
      toast.success(response.data?.message || "Product added to cart");

    } catch (error) {
        console.log("Error adding product to Cart ", error);

        toast.error(error.response?.data?.message || "Failed to add product to cart");  }
      finally{
        dispatch(setLoading(false));
    }
  };

  const handleUpdateCartQuantity = async ({productId, quantity}) => {
    try {
      dispatch(setLoading(true));

      const response = await updateCartQuantity({productId, quantity});

      if(response?.data?.cart){
        dispatch(setCart(response.data.cart));
      }

    }catch (error) {
        console.log("Error in handle Add To Cart ", error);

        toast.error(error.response?.data?.message || "Failed to update product quantity");  }
    finally{
        dispatch(setLoading(false));
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      dispatch(setLoading(true));

      const response = await removeFromCart(productId);
      
      if(response?.data?.cart){
        dispatch(setCart(response.data.cart));
      }
      
      toast.success(response.data?.message || "Product removed from cart")
      
    }catch (error) {
        console.log("Error removing product from cart:", error);

        toast.error(error.response?.data?.message || "Failed to remove product from cart");  }
    finally{
        dispatch(setLoading(false));
    }
  };

  const handleClearCart = async () => {
    try {
      dispatch(setLoading(true));

      const response = await clearCart();
      
      if(response?.data?.cart){
        dispatch(setCart(response.data.cart));
      }else{
        dispatch(clearCartState());
      }
      
    }catch (error) {
        console.log("Error in clearing Cart ", error);

        toast.error(error.response?.data?.message || "Failed to clear  cart");  }
    finally{
        dispatch(setLoading(false));
    }
  };

  return {fetchCart, handleAddToCart, handleUpdateCartQuantity, handleRemoveFromCart, handleClearCart};

}

export default useCart;