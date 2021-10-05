import React, { Component } from 'react';


import { connect } from 'react-redux';

import { clearTokens } from './../../Jwt/token';
import { getContacts } from '../../Redux/Contacts/AsyncActions';

import "./Home.css";
import Navbar from '../NavBar/Navbar';
import MenuBar from '../MenuBar/MenuBar';
import AddContact from '../AddContact/AddContact';
import { NavLink } from 'react-router-dom';
import InfoSection from '../InfoSection/InfoSection';

import { deleteContact } from './../../Redux/Delete/DeleteAsyncActions';

import {toast} from "react-toastify";

class HomePage extends Component {
    state = {
            data:[],
            colorsArray:["#818181", "#0167b6", "#ec0666", "#006d00"],
            addNewContact: false,
        }
    componentDidMount = async()=>{
        await this.props.disPatch(getContacts());

        const {data} = this.props.contacts;
        this.setState({data})

        this.props.history.push(`/home/contact/${this.state.data[0].id}`);

        this.shuffleColors()
    }
    logOut = ()=>{
        const {updateRoutes} = this.props;
        clearTokens();
        updateRoutes();
    }
    addNewContact = ()=>{
        const state = {...this.state};
        if(state.addNewContact){
            state.addNewContact = false;
        }else{
            state.addNewContact = true;
        }
        this.setState(state);
    }
    shuffleColors = ()=>{
        const state = {...this.state};   /* create a copy of the state*/
        let {colorsArray} = state;       /* get a copy of the colorsArray*/
        const newColorsArray =   this.props.contacts.data.map(()=>{
            return(
                colorsArray[Math.floor(Math.random() * colorsArray.length)]
            )
        })
         
        state.colorsArray = newColorsArray;
        this.setState(state)
    }
    handleDelete = async()=>{
        const currentUrlID = this.props.location.pathname.split("/")[3];
        const state = {...this.state};
        const oldContacts = state.data;
        const newContacts = oldContacts.filter((contact)=> contact.id !== Number(currentUrlID));
        state.data = newContacts;
        this.setState(state);
        
        //then dispatch the delete action to delete the contact from back-end
        await this.props.disPatch(deleteContact(oldContacts, currentUrlID));
        
        //check if there is an error or not
        if(this.props.deleteError){
            //if error exist return the old contacts to the component state
            state.data = oldContacts;
            this.setState(state);
            toast.error(`Can't Delete This Contact 
                         "${this.props.deleteError}"`)
        }else{
            this.props.history.push(`/home/contact/${this.state.data[0].id}`);
        }
        
    }
    render() {
        const contactsArray = this.state.data;
         return (
            <div className="home">
                <Navbar logOut={this.logOut}/>
                <MenuBar addNewContact={this.addNewContact}/>

                <section className="content">
                    <div className="list">
                        <div className="option">
                            <span><i className="fas fa-users"></i></span>
                            <span>Your Contacts</span>
                        </div>
                        
                    </div>

                    <div className="contacts-section">
                        <h3>Your Contacts</h3>
                        <div className="contacts-holder">
                            {contactsArray.map((contact, index)=>{
                                return(
                                    <NavLink    key={index}
                                                className="contact" 
                                                to={`/home/contact/${contact.id}`}
                                                activeStyle={{
                                                    backgroundColor: "#0078d4",
                                                }} >

                                         
                                        <span   className="placeholder" 
                                                style={{backgroundColor:this.state.colorsArray[index]}}
                                                >
                                            {contact.name[0].toUpperCase()}
                                            
                                        </span>
                                        <div className="info">
                                            <h5>{contact.name}</h5>
                                            <span>{contact.phones[0].value}</span>
                                        </div>
                                        
                                         

                                    </NavLink>  
                                )
                            })}
                        </div>
                    </div>

                    <InfoSection colorsArray = {this.state.colorsArray} 
                                    handleDelete = {this.handleDelete} 
                                    {...this.props}/>

                    {this.state.addNewContact?(
                        <AddContact addNewContact={this.addNewContact}/>
                    ):false}
                    
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        contacts: state.contactsReq,
        deleteError:state.newContacts.error
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        disPatch : (action) => dispatch(action)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);