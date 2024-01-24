
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentToken } from "../redux/features/auth/authSlice";
// import Loader from "../components/Loader/Loader";


const PrivateRoute = ({children}) => {
    const token = useSelector(useCurrentToken);
    console.log(token);
    const location = useLocation();

    if (!token) {
        return children;
    }
    // if (loading) {
    //     return <Loader/>;
    // }
    return <Navigate to="/login" state={{form: location}} replace></Navigate>
};

export default PrivateRoute;