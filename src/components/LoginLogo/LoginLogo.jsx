import React from 'react';
import logo from "../../logo.png";
import "./LoginLogo.css"

const LoginLogo = () => {
    return ( 
        <div className="login-logo">
            <img src={logo} alt="logo"/>
        </div>
     );
}
 
export default LoginLogo;