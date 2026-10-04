import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser, loginUser, logoutUser, signupUser} from "../api/AuthApi";
 
import { setLoading } from "../redux/slice/productSlice";

import {setAuthLoading, setUser, clearUser} from "../redux/slice/authSlice";
import { toast } from "react-toastify";

const useAuth = () => {

    const dispatch = useDispatch();

    const {user, isAuthenticated, loading} = useSelector((state) => state.auth);

    const currentUser = async () => {

        try {

            const response = await getCurrentUser();

            if (response.data?.success) {
                dispatch(setUser(response.data.user));
            } else {
                dispatch(clearUser());
            }

            return response.data;

        } catch (error) {

            dispatch(clearUser());

            throw error;

        } finally {

            dispatch(setAuthLoading(false));

        }
    };

    const login = async (data) => {

        try {

            dispatch(setLoading(true));

            const response = await loginUser(data);

            if (response.data?.success) {
                dispatch(setUser(response.data.user));
            }

            return response.data;

        } catch (error) {

            console.log("Error in login", error);

            throw error;

        } finally {

            dispatch(setLoading(false));

        }
    };

    const signup = async (data) => {

        try {

            dispatch(setLoading(true));

            const response = await signupUser(data);

            return response.data;

        } catch (error) {

            console.log("Error in signup", error);

            throw error;

        } finally {

            dispatch(setLoading(false));

        }
    };


    const logout = async () => {

        try {

            dispatch(setLoading(true));

            const response = await logoutUser();

            if (response.data?.success) {
                dispatch(clearUser());
            }

            return response.data;

        } catch (error) {

            console.log("Error in logout", error);

            toast.error(error?.response?.data?.message || "Something went wrong during Logout")

            throw error;

        } finally {

            dispatch(setLoading(false));

        }
    };


    return {user, isAuthenticated, loading, login, signup, logout, currentUser};
};

export default useAuth;