import React, { Component } from 'react';
import ContactButton from '../ContactButton/ContactButton';

import "./MenuBar.css"

class MenuBar extends Component {
    
    render() { 
        return (
            <div className="menu-bar">
                <div className="left-div">
                    <i className="fas fa-bars"></i>
                    <ContactButton addNewContact = {this.props.addNewContact} 
                                    name="New contact" 
                                    width="110px" 
                                    height="80%"/>
                </div>
            </div>
        );
    }
}
 
export default MenuBar;