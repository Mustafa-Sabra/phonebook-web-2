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

import Loader from '../Loader/Loader';

class HomePage extends Component {
    state = {
            data:[],
            colorsArray:["#818181", "#0167b6", "#ec0666", "#006d00"],
            addFormIsOpen: false,
            
           
        }
    componentDidMount = async()=>{
        await this.props.disPatch(getContacts());

        const {data} = this.props.contacts;
        this.setState({data})

        if(data.length !== 0){
            this.props.history.push(`/home/contact/${this.state.data[0].id}`);
        }
        

        this.shuffleColors()
    }
    
    logOut = ()=>{
        const {updateRoutes} = this.props;
        clearTokens();
        updateRoutes();
    }
    toggleAddForm = ()=>{
        const state = {...this.state};
        if(state.addFormIsOpen){
            state.addFormIsOpen = false;
        }else{
            state.addFormIsOpen = true;
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
            if(this.state.data.length !==0){
                this.props.history.push(`/home/contact/${this.state.data[0].id}`);
            }
        }
        
    }
    updateContactsAfterAddition = async(newContactInfo)=>{
        //colne the state
        const state = {...this.state};
        //clone the contacts data
        const {data} = state;
        //edit the data 
        data.push(newContactInfo);
        state.data = data;
        //update the state
        await this.setState(state);

        if(data.length !== 0){
            this.props.history.push(`/home/contact/${this.state.data[0].id}`);
        }
    }
    updateContactsAfterEdit = (newContactInfo)=>{
        //colne the state
        const state = {...this.state};
        //clone the contacts data
        const data = [...state.data];
        //object keys array
        const keysArray = Object.keys(newContactInfo);
        //edit the contact
        data.forEach((contact)=>{
            if(contact.id === newContactInfo.id){
                keysArray.forEach(prop=>{
                    contact[prop] = newContactInfo[prop]
                })
            }
        })
        state.data = data;
        //update the state
        this.setState(state);
    }
    updateInfoAfterDeletingPhones = (contact_id)=>{
        const contacts = [...this.state.data];
        const contact = contacts.find(contact => contact.id === Number(contact_id));
        const phones = [...contact.phones];
        const newPhones = phones.filter(phone => phone.value !== "");
        contact.phones = newPhones;

        this.setState({data:contacts});
    }
    handleSearch = (e)=>{
        /*  
            here we will use the store data because, we want to 
            search over the whole data every time there is a change in the input field,
            if we used the state data, every time you input or delete a char from the input field
            it will updata the state so the next time it will search in the updated state 
            and contacts will be missed and not search over it
        */
        const oldContacts = [...this.props.contacts.data];
        const valueToSearch = e.currentTarget.value;
        
        const matchedContacts = oldContacts.filter(contact => contact.name.search(valueToSearch) !== -1);

        this.setState({data:matchedContacts});
        
        if(this.state.data.length){
            this.props.history.push(`/home/contact/${this.state.data[0].id}`);
        }
        
    }
    updateInfoAfterAddingNewPhones = (newPhonesArray, contact_id)=>{
        const contacts = [...this.state.data];
        const contact = contacts.find(ele => ele.id === Number(contact_id));
        const oldPhones = contact.phones;
        const newPhones = [...oldPhones, ...newPhonesArray];
        contact.phones = newPhones;
        
        const indexOfContact = contacts.indexOf(contact);

        contacts[indexOfContact] = contact;

        this.setState({data: contacts});

        
    }
    
    updateInfoAfterEditingPhones = (newPhones, contact_id)=>{
        const contacts = [...this.state.data];
        const contact = contacts.find(ele => ele.id === Number(contact_id));
        contact.phones = newPhones;

        const contactIndex = contacts.indexOf(contact);
        contacts[contactIndex] = contact;
        this.setState({data: contacts})
    }
    render() {
        const contactsArray = this.state.data;
        
        {
            if(this.props.contacts.loading === false){
                return(
                    <div className="home">
                        <Navbar logOut={this.logOut}/>
                        <MenuBar toggleAddForm={this.toggleAddForm} handleSearch={this.handleSearch}/>

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
                                    {(contactsArray.length === 0)?(
                                        <div className="no-contacts-msg">There are no contacts</div>
                                    ):(
                                        contactsArray.map((contact, index)=>{
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
                                                        <span>{contact.phones.length? contact.phones[0].value:false}</span>
                                                    </div>
                                                    
                                                    
            
                                                </NavLink>  
                                            )
                                        })
                                    )}
                                </div>
                            </div>

                            <InfoSection colorsArray = {this.state.colorsArray} 
                                            handleDelete = {this.handleDelete}
                                            editedContacts = {this.state.data}
                                            updateContactsAfterEdit = {this.updateContactsAfterEdit}
                                            updateInfoAfterAddingNewPhones={this.updateInfoAfterAddingNewPhones}
                                            updateInfoAfterEditingPhones={this.updateInfoAfterEditingPhones}
                                            updateInfoAfterDeletingPhones = {this.updateInfoAfterDeletingPhones}
                                            {...this.props}/>

                            {this.state.addFormIsOpen?(
                                <AddContact toggleAddForm={this.toggleAddForm} updateContactsAfterAddition={this.updateContactsAfterAddition}/>
                            ):false}

                            
                            
                        </section>
                    </div>
                );
            }else{
                return(
                    <div className="loader-page">
                        <Loader />
                    </div>
                )
            }
        }
        
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