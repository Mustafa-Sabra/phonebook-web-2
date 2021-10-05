import React, { Component } from 'react'

 

import "./AddContact.css" 
class AddContact extends Component {
    render() {
        const {addNewContact}=  this.props;
        return( 
            <div className="add-contact">
                <div className="card">
                   <div className="left-div">
                       <h3>New contact</h3>
                       <p>
                       You can add more information than what you see here, such as address and birthday. Select <span>Add more</span> to bring up more options.
                       </p>
                   </div>
                   <div className="right-div">
                       <span className="exit-icon" onClick={addNewContact}>
                           <i className="fas fa-times"></i>
                        </span>
                       
                   </div>
                </div>
            </div>
        );
    }
}
 
export default AddContact;