import React, { Component } from 'react'
import ContactButton from '../ContactButton/ContactButton';

import { connect } from 'react-redux';

import EditContact from '../EditContact/EditContact';


import "./InfoSection.css"

class InfoSection extends Component {
    state={
        contactsArray:[],
        editFormIsOpen: false,
    }
    componentDidMount=()=>{
        setTimeout(()=>{
            const {contactsArray} = this.props;
            this.setState({contactsArray});
        },1000)
    }
    toggleEditForm = ()=>{
        const state = {...this.state};
        if(state.editFormIsOpen){
            state.editFormIsOpen = false;
        }else{
            state.editFormIsOpen = true;
        }
        this.setState(state);
    }
    render() { 
        const currentUrlID = this.props.location.pathname.split("/")[3];
        const currentContact = this.state.contactsArray.find((contact) => contact.id === Number(currentUrlID)) ;
        //console.log(this.state.data);
        const phoneTypesArray = ["Home", "Mobile", "Business", "Other"]  //type_id = index + 1
        return (
            currentContact?(
            <div className="info-section">
                <div className="header">
                    <span className="placeholder">{currentContact.name[0].toUpperCase()}</span>
                    <div>
                        <h4>{currentContact.name}</h4>
                        <div className="options">
                            <ContactButton name="call" height="30px" width="90px" iconClass="fas fa-mobile-alt"/>  
                            <i className="far fa-envelope"></i>
                            <i className="far fa-comment-alt"></i>
                        </div>
                    </div>
                </div>

                
                    <ul className="nav">
                        <li className="active">Contact</li>
                        <li>Email</li>
                        <li>Files</li>
                        <li>LinkedIn</li>
                    </ul>

                <div className="contact-box">
                    <p>
                        <span>Contact information</span>
                        <span className="edit" onClick={this.toggleEditForm}>
                            <i className="fas fa-pencil-alt"></i>Edit contact
                        </span>
                    </p>

                    <div className="contact-info">
                        {currentContact.email?(
                            <div className="email">
                                <span>Email</span>
                                <span>{currentContact.email}</span>
                            </div>
                        ):false
                        }
                        
                        {currentContact.phones.map((phone)=>{
                           return(
                            phone.value?(
                                <div className="phone" key={phone.id}>
                                        <span>{phoneTypesArray[phone.type_id - 1]}</span>
                                        <span>{phone.value}</span>
                                </div>
                            ):false
                           )
                        })}
                        
                    </div>
                </div>

                <div className="notes-section">
                    <h4>Notes</h4>
                    <div>
                        <p><i className="fas fa-pencil-alt"></i> Add your own notes here</p>
                        <ContactButton handleDelete={this.props.handleDelete} 
                                        height="40px" 
                                        width="150px" 
                                        name="Delete Contact"/>
                    </div>
                    
                </div>

                {this.state.editFormIsOpen?(
                        <EditContact toggleEditForm={this.toggleEditForm}
                                        updateContactsAfterEdit = {this.props.updateContactsAfterEdit} 
                                        updateInfoAfterAddingNewPhones = {this.updateInfoAfterAddingNewPhones}
                                        updateInfoAfterEditingPhones={this.updateInfoAfterEditingPhones}
                                        updateInfoAfterDeletingPhones={this.props.updateInfoAfterDeletingPhones}
                                        {...this.props}/>
                    ):false}
                 
            </div>
            ):(
                <div className="loading-layer">
                    
                </div>
            )
        );
    }
}

const mapStateToProps =  (state)=>{
    return{
        contactsArray:  state.contactsReq.data,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        disPatch: (action) => dispatch(action)
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoSection) ;