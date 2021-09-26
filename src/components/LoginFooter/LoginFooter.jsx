import React from 'react';
import {Link} from "react-router-dom";
import "./LoginFooter.css"
const LoginFooter = () => {
    return ( 
        <div className="login-footer">
            <span>
                Don't have an acount?
            </span>
            <Link className="register-link" to="/register">Register!</Link>
        </div>
     );
}
 
export default LoginFooter;