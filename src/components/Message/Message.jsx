import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTokens } from '../../Jwt/token';
import { clearLoginRequest } from '../../Redux';
import "./Message.css"

const Message = (props) => {
    const {type, page, disPatch, message} = props;
    if(type === "valid" && page === "sign up"){
        return ( 
            <div className="msg val-msg">
                <span><i className="fas fa-check-circle"></i>Your Registeration succeeded</span>
                <span>Now you can go and <Link to="/login" onClick = {() => {clearTokens(); 
                                                                            disPatch(clearLoginRequest())
                                                                            }}>Sign In</Link>
                </span>
            </div>
         );
    }else if(type === "error" && page === "sign up"){
       return (
            <div className="msg err-msg">
                <span><i className="fas fa-times-circle" ></i>This Email Is Already Exist</span>
                <span>Try Another Email</span>
             </div>)

    }else if(type === "error" && page === "sign in"){
        return(
            <div className="msg err-msg">
                <span><i className="fas fa-times-circle" ></i>Uncorrect Email or Password</span>
                <span>Try Again</span>
             </div>)
    } else if(type === "error" && page === "add contact"){
        return(
            <div className="msg add-contact-error">
                <span><i className="fas fa-times-circle" ></i>{message}</span>
             </div>)
    }

    
}
const mapDispatchToProps = (dispatch)=>{
    return {
        disPatch: (action) => dispatch(action),
    }
}
export default connect(null, mapDispatchToProps)(Message);