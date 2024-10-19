import {Navigate, Outlet} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children, user, redirect='/auth' }) => {

    if (!user) return <Navigate to={redirect} />;

    return children ? children : <Outlet />;
}

export default ProtectRoute;
