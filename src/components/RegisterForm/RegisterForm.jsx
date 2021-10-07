import React, { Component } from 'react';

import { connect } from 'react-redux';

import InputField from './../InputField/InputField';
import Button from '../Button/Button';

import"./RegisterForm.css";
import { mapRegInfo } from "../../Redux/index.js";
import { userRegister } from './../../Redux/Registration/AsyncAtions';


class RegisterForm extends Component {
    state={
        user:{
            fullName:"",
            email:"",
            password:"",
        }
    }
    handleChange=(e)=>{
        const state = {...this.state};
        if(e.target.name === "Email"){
            state.user.email = e.target.value;
        }else if(e.target.name === "Password"){
            state.user.password = e.target.value;
        }else if(e.target.name === "Full-Name"){
            state.user.fullName = e.target.value;
        }
        this.setState(state);
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.disPatch(mapRegInfo(this.state.user));
        setTimeout(()=>{
            this.props.disPatch(userRegister(this.props.userInfo));
        }, 200);
        const user = {...this.state.user};
        user.fullName = "";
        user.email = "";
        user.password = "";

        this.setState({user});
    }
    render() { 
        const {fullName, email, password} = this.state.user;
        return (
            <form className="register-form" onSubmit={this.handleSubmit} autoComplete="off">
                <InputField type={"text"} label={"Full-Name"} id={"full_name"} value = {fullName} handleChange={this.handleChange}/>
                <InputField type={"email"} label={"Email"} id={"email"} value = {email}  handleChange={this.handleChange}/>
                <InputField type={"password"} label={"Password"} id={"password"} value = {password}    handleChange={this.handleChange}/>
                <Button name={"Sign Up"} width={"100%"} height={"45px"}/>
                
            </form>
        );
    }
}
 
const mapStateToProps = (state)=>{
    return{
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        disPatch: (action) => dispatch(action)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm) ;