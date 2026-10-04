import { useState, useCallback } from "react";
import { getAllOrders, getUserOrders, updateOrderStatus as updateOrderStatusApi } from "../api/orderApi";
import {toast} from 'react-toastify';

const useOrder = () => {

  const [orders, setOrders] = useState([]);

  const [attempts, setAttempts] = useState([]);

  const [allOrders, setAllOrders] = useState([]);
  
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [allOrdersLoading, setAllOrdersLoading] = useState(false);

  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    
    setOrdersLoading(true);
   
    try {
      const response = await getUserOrders();
     
      if (response.data?.success) {
        setOrders(response.data.orders);
        setAttempts(response.data.paymentAttempts);
      }

    } catch (error) {

      console.log("Error in fetching order:", error);

      toast.error(error.response?.data?.message || "Failed to load orders. Please try again.");
    
    } finally {

       setOrdersLoading(false);

    }
  }, []);

  const fetchAllOrders = useCallback(async()=>{

    setAllOrdersLoading(true);
 
    try {

      const response = await getAllOrders()
          
      if(response?.data?.success){
        setAllOrders(response?.data?.orders);
      }

    } catch (error) {

      console.log("Error in fetching all orders:", error);

      toast.error(error.response?.data?.message || "Failed to load orders. Please try again.");
    
    }finally{
      
      setAllOrdersLoading(false);
   
    }
  },[])

  const updateOrderStatus = useCallback(async (id, orderStatus) => {

        setUpdateStatusLoading(true);

        try {
            const response = await updateOrderStatusApi(id, orderStatus );

            if (response?.data?.success) {

                setAllOrders((prevOrders) => prevOrders.map((order) => order._id === id
                            ? {
                                ...order,
                                orderStatus
                              }
                            : order
                    )
                );

                toast.success("Order status updated successfully" );

            }

        } catch (error) {

            console.log("Error updating order status:",  error);

            toast.error(error.response?.data?.message || "Failed to update order status" );

        }finally{

            setUpdateStatusLoading(false);

        }

    },[]);

  return {orders, attempts, allOrders, ordersLoading, allOrdersLoading, updateStatusLoading, fetchOrders, fetchAllOrders, updateOrderStatus };

};

export default useOrder;