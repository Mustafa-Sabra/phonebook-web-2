import React, { Component } from 'react';
import ContactButton from '../ContactButton/ContactButton';
import Search from '../Search/Search';

import "./MenuBar.css"

class MenuBar extends Component {
    
    render() { 
        const {toggleAddForm, handleSearch} = this.props;
        return (
            <div className="menu-bar">
                <div className="left-div">
                    <i className="fas fa-bars"></i>
                    <ContactButton toggleAddForm = {toggleAddForm}
                                    name="New contact" 
                                    width="110px" 
                                    height="80%"/>
                </div>
                <div className = "right-div">
                    <Search handleSearch = {handleSearch}/>
                </div>
                    
            </div>
        );
    }
}
 
export default MenuBar;