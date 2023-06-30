import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    let auth = true;
    let location = useLocation();
    let navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    if (auth) {
        navigate(from, { replace: true });
    }
    
    return (
        <h1>Login</h1>
    );
}

export default Login;