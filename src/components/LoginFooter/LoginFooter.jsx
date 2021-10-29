import React from 'react';
import "./LoginFooter.css"
const LoginFooter = () => {
    return ( 
        <div className="login-footer">
            <span>
                Don't have an acount?
            </span>
            <a href="/register" className="register-link" >Register!</a>
        </div>
     );
}
export default LoginFooter;