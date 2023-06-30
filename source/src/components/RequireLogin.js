import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function RequireLogin({ children, authStatus }) {
    let auth = authStatus;
    let location = useLocation();

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireLogin;