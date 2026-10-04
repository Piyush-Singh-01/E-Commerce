// import { Loader } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({children}) =>{

    const {user, isAuthenticated, loading} = useAuth();

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if(!isAuthenticated){

        return <Navigate to= "/login?redirect=/admin" replace />;
    }

    if(user?.role !== "admin"){

        return  <Navigate to= "/" replace />
        
    }

    return children
}

export default AdminProtectedRoute;