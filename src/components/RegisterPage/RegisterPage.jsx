import React, { Component } from 'react';
import LoginLogo from '../LoginLogo/LoginLogo';

import "./RegisterPage.css";
import LoginHeader from './../loginHeader/LoginHeader';
import RegisterForm from '../RegisterForm/RegisterForm'; 
import { connect } from 'react-redux';
import Message from '../Message/Message';

class RegisterPage extends  Component {
    render() {
        const {status} = this.props;
        
        return (
            <div className="register-page">
                <div className="register-card" >
                    <div className="container">
                        <span className="sign-in-label">
                            <a href="/login">Sign In</a>
                        </span>
                        <LoginLogo/>
                        <LoginHeader h1_content={"Welcome to GDSC!"}  
                                    h4_content = {"Please enter your information to Sign Up"}/>
                        <RegisterForm/>

                        {status === "success"?(<Message type = "valid" page="sign up"/>):false}
                        {status === "failure"?(<Message type = "error" page="sign up"/>):false}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        status: state.loginReq.status,
    }
}

export default connect(mapStateToProps)(RegisterPage) ;