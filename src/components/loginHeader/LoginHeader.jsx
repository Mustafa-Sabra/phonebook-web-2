import React, { Component } from 'react';

import "./LoginHeader.css";

class LoginHeader extends Component {
    render() { 
        return (
            <div className="login-header">
                <h1>{this.props.h1_content}</h1>
                <h4>{this.props.h4_content}</h4>
            </div>
            );
    }
}
 
export default LoginHeader;