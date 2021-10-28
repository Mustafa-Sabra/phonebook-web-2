import React, {Component} from 'react';
import "./InputField.css";
class InputField extends Component {
    state = {
        pass_isPressed: false,
        see_password: false,
    }
    handleClick = ()=>{
        let state = {...this.state};
        if(state.pass_isPressed){
            state.pass_isPressed = false;
        }else{
            state.pass_isPressed = true;
        }
        
        this.setState(state);
    }
    handlePass = ()=>{
        let state = {...this.state};
        if(state.see_password){
            state.see_password = false;
        }else{
            state.see_password = true;
        }
        
        this.setState(state);
    }
    render() {
        const {type, label, value, id,backGroundColor, color, handleChange} = this.props;

        return ( 
            <div className="form-group password-field" style={{backgroundColor:backGroundColor}}>
                        <div className="holder">
                            <label onClick={this.handleClick}
                                    style = {this.state.pass_isPressed? {color:color,height:"50%", fontSize:"8px"}:{color:color,height:"100%"}}
                                    htmlFor={id}>{label}</label>
                            <input  required
                                    id={id}
                                    value={value}
                                    name={label}
                                    type={this.state.see_password? "text":type}
                                    minLength={type === "password" || type === "text"? "8" : "false"}
                                    maxLength={type === "password" || type === "text"? "16" : "32"}
                                    onChange={handleChange}
                                    style = {this.state.pass_isPressed? {color:color,height:"50%", top:"50%", opacity:"1"}:
                                                            {color:color,height:"100%", top:"0",opacity:"0"}}/>
                        </div>
                        { type === "password"?<i className="fas fa-eye" onClick={this.handlePass}></i>:false}
                        
            </div>
         );
    }
}
export default InputField;