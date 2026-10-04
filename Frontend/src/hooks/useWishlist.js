import { removeFromWishlist, toggleWishlist, getWishlist, clearWishlist } from "../api/wishlistApi";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import { setWishlist, setLoading, clearWishlistState } from "../redux/slice/wishlistSlice";

const useWishlist = ()=>{

  const dispatch = useDispatch();

  const fetchWishlist = async () => {
    try {
      dispatch(setLoading(true));

      const response = await getWishlist();

      if(response?.data?.success){
        dispatch(setWishlist(response.data.wishlist.products));
      }

    } catch (error) {
        console.log("Error in Fetching wishlist:", error);

        toast.error(error.response?.data?.message || "Failed to fetch wishlist");
    }finally{
        dispatch(setLoading(false));
    }
  };

  const handletoggleWishlist = async (productId) => {
    try {
      dispatch(setLoading(true));
      
      const response = await toggleWishlist(productId);      
      
      if(response?.data?.success){
        dispatch(setWishlist(response.data.wishlist.products));
      }
      
      toast.success(response.data?.message || "Product added to wishlist");

    } catch (error) {
        console.log("Error adding product to Wishlist ", error);

        toast.error(error.response?.data?.message || "Failed to add product to wishlist");  }
      finally{
        dispatch(setLoading(false));
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      dispatch(setLoading(true));

      const response = await removeFromWishlist(productId);
      
      if(response?.data?.success){
        dispatch(setWishlist(response.data.wishlist.products));
      }
      
      toast.success(response.data?.message || "Product removed from Wishlist")
      
    }catch (error) {
        console.log("Error removing product from wishlist:", error);

        toast.error(error.response?.data?.message || "Failed to remove product from wishlist");  }
    finally{
        dispatch(setLoading(false));
    }
  };

  const handleClearWishlist = async () => {
    try {
      dispatch(setLoading(true));

      const response = await clearWishlist();
      
      if(response?.data?.success){
        dispatch(clearWishlistState());
      }
      
    }catch (error) {
        console.log("Error in clearing wishlist ", error);

        toast.error(error.response?.data?.message || "Failed to clear wishlist");  }
    finally{
        dispatch(setLoading(false));
    }
  };

  return {fetchWishlist, handletoggleWishlist, handleRemoveFromWishlist, handleClearWishlist};

}

export default useWishlist;