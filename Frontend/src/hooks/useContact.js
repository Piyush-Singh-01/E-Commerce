import { toast } from "react-toastify";
import axiosInstance from "../api/axios";
import { useState } from "react";

const useContact = ()=>{

    const [loading, setLoading] = useState(false);

    const handleMessage = async(data)=>{
          
        try {
            setLoading(true);
            const response = await axiosInstance.post('/contact/send-message', data);

            if(response?.data.success){
                toast.success(response?.data.message || "Message send successfully")
            }
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong in sending message");
            console.log("Error in sending message", error);
        }finally{
            setLoading(false);
        }

    }
    return {handleMessage, loading}
}

export default useContact;