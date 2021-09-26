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
        const {type, name, value} = this.props;
        return ( 
            <div className="form-group password-field">
                        <div className="holder">
                            <label onClick={this.handleClick}
                                    style = {this.state.pass_isPressed? {height:"50%"}:{height:"100%"}}
                                    htmlFor={name}>{name}</label>
                            <input  required
                                    id={name}
                                    value={value}
                                    name={name}
                                    type={this.state.see_password? "text":type}
                                    minLength={type === "password" || type === "text"? "8" : "false"}
                                    maxLength={type === "password" || type === "text"? "16" : "32"}
                                    onChange={this.props.handleChange}
                                    style = {this.state.pass_isPressed? {height:"50%", top:"50%", opacity:"1"}:
                                                            {height:"100%", top:"0",opacity:"0"}}/>
                        </div>
                        { type === "password"?<i className="fas fa-eye" onClick={this.handlePass}></i>:false}
                        
            </div>
         );
    }
}
export default InputField;