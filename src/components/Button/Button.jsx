import React from 'react';
import "./Button.css"
const Button = (props) => {
    return ( 
        <button className="custom-btn" onClick = {() => props.name === "Log Out"?props.logOut():false} 
                style={{width:props.width, 
                        height:props.height,
                         
                        }}>
                {props.name}
        </button>
     );
}
 
export default Button;
 