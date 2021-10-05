import React from 'react';

import "./ContactButton.css"

const ContactButton = (props) => {
     const { height, width, name, addNewContact, iconClass, handleDelete} = props;
    return ( 
                <button onClick={()=>{
                                        addNewContact? addNewContact():handleDelete();
                                    }} className="contact-button" 
                        style={{height: height, width: width}}>
                   
                    <i className={ iconClass}></i>
                    { name}
                </button>
            );
}
 
export default ContactButton;