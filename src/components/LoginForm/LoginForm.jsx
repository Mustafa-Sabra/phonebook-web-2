import React, { Component } from 'react';
import {connect} from "react-redux";
import {mapUserInfo} from "../../Redux/index.js";

import Button from '../Button/Button';
import InputField from '../InputField/InputField';

import { userLogin } from '../../Redux/Login/AsyncActions.js';

import "./LoginForm.css";
import { getToken } from './../../Jwt/token';

class LoginForm extends Component {
    state = {
        user:{
            email:"",
            password: "",
        }
    }
    handleChange=(e)=>{
        const state = {...this.state};
        if(e.target.type === "email"){
            state.user.email = e.target.value;
        }else if(e.target.type === "password"){
            state.user.password = e.target.value;
        }
        this.setState(state);
    }
     
    handleSubmit = async(e)=>{
        e.preventDefault();
        await this.props.disPatch(mapUserInfo(this.state.user));
     
        this.props.disPatch(userLogin(this.props.userInfo));

        setTimeout(()=>{
            if(getToken("userToken")){
                this.props.updateRoutes();
            }
       }, 1500)
        

        const user = {...this.state.user};
        user.email = "";
        user.password = "";
        this.setState({user});
        
        
    }
    
    render() {
        const {email, password} = this.state.user;
       // console.log(getToken("userToken"));
        return (
            <form className="login-form" onSubmit={this.handleSubmit} autoComplete="off">
                <InputField type={"email"} name={"Email"} value={email} handleChange={this.handleChange}/>
                <InputField type={"password"} name={"Password"} value = {password} handleChange={this.handleChange}/>
                <Button name={"Login"} width={"100%"} height={"45px"}/>
            </form>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        userInfo: state.userInfo,
        status:state.loginReq,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        disPatch: (action) => dispatch(action)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);