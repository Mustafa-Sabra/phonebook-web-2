import React, { Component } from 'react';

import "./Login.css";

import LoginLogo from './../LoginLogo/LoginLogo';
import LoginHeader from "../loginHeader/LoginHeader";
import LoginForm from "../LoginForm/LoginForm";
import LoginFooter from "../LoginFooter/LoginFooter"
import { connect } from 'react-redux';
import Message from './../Message/Message';

class LoginPage  extends Component{
    render() { 
        const {status} = this.props;
        const {updateRoutes} = this.props;
        return (
            <div className="login-page">
                <div className = "login-card" >
                    <div className="container">
                        <LoginLogo />
                        <LoginHeader h1_content={"Welcome to GDSC!"}  
                                    h4_content = {"Keep your data safe!"}/>
                        <LoginForm {...this.props} updateRoutes={updateRoutes}/>
                        <LoginFooter />
                        {status === "failure"?(<Message type = "error" page="sign in"/>):false}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        status: state.loginReq.status,
    }
}
 
export default connect(mapStateToProps)(LoginPage);