import { toast } from "react-toastify";
import { createRazorpayOrder, verifyRazorpayPayment, createBuyNowOrder, saveFailedPayment} from "../api/paymentApi";

const usePayment = ()=>{

    const openRazorpayCheckout = (razorpayOrder, onSuccess)=>{

        if (!window.Razorpay) {
            toast.error("Razorpay SDK failed to load. Please check your connection.");
            return;
        }
            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "Cartify",

                description: "Order payment",

                order_id: razorpayOrder.id,

                handler: async function(response){

                    try {
                        const verifyResponse = await verifyRazorpayPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        },
                        {
                            withCredentials: true
                        }
                    );

                        if(verifyResponse?.data?.success){

                            toast.success("Payment successful!");

                            onSuccess?.(verifyResponse.data.order);
                        }

                    } catch (error) {

                        console.error("Payment verification failed:", error);

                        toast.error(error.response?.data?.message || "Payment verification failed");
                    }
                },

                modal: {
                    ondismiss: ()=>{
                        toast.info("Payment cancelled");
                    }
                },

                theme: {
                    color: "#111827"
                }          
            }

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", async function(response){
                try {
                    await saveFailedPayment({
                        razorpay_order_id: razorpayOrder.id,

                        reason: response.error?.description || "Payment failed"
                    })

                    toast.error(response.error?.description || "Payment failed");

                } catch (error) {
                    console.error("Save failed payment error:", error);
                }
            })

            razorpay.open();
    }

    const handleCheckout = async(onSuccess)=>{
        try {
            const response = await createRazorpayOrder();

            const razorpayOrder = response.data.order;

            openRazorpayCheckout(razorpayOrder, onSuccess);

        } catch (error) {

            console.error("Checkout error:", error);

            toast.error(error.response?.data?.message ||"Failed to start checkout");
        }
    }

    const handleBuyNow = async({productId, quantity = 1, onSuccess})=>{
        try {
            const response = await createBuyNowOrder({productId, quantity});

            const razorpayOrder = response.data.order;

            openRazorpayCheckout(razorpayOrder, onSuccess);

        } catch (error) {

            console.error("Buy Now Checkout error:", error);

            toast.error(error.response?.data?.message ||"Failed to start Buy Now");
        }
    }
    return {handleCheckout, handleBuyNow};
}

export default usePayment;