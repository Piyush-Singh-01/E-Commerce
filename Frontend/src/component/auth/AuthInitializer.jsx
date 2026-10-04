import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const AuthInitializer = () => {

    const { currentUser } = useAuth();

    useEffect(() => {
        currentUser();
    }, []);

    return null;
};

export default AuthInitializer;