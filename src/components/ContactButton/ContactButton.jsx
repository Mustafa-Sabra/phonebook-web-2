import React from 'react';

import "./ContactButton.css"

const ContactButton = (props) => {
     const { height, width, name, toggleAddForm, iconClass, handleDelete} = props;
    return ( 
                <button onClick={()=>{
                                        toggleAddForm? toggleAddForm():handleDelete();
                                    }} className="contact-button" 
                        style={{height: height, width: width}}>
                   
                    <i className={ iconClass}></i>
                    { name}
                </button>
            );
}
 
export default ContactButton;