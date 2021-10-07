import React, { Component } from 'react'
import {connect} from "react-redux";

import InputField from "../InputField/InputField"

import "./AddContact.css" 
import { postNewContact } from './../../Redux/AddContact/AddContactAsyncActions';

class AddContact extends Component {
    state={
        newContactInfo:{
            email:"",
            name:"",
            first_name:"",
            last_name:"",
            company:"",
            notes:"",
            phones:[
                {   id:1,
                    type_id:2,
                    value: "",
                }
            ],
            
        },
        numberOptionsListIsOpen:false,
        phoneInputsArray : [{type:"Mobile", id:2}]
    }
    handleNumberOptionsList = ()=>{
        const state = {...this.state};
        let {numberOptionsListIsOpen} = state;
        if(numberOptionsListIsOpen){
            numberOptionsListIsOpen = false;
        }else{
            numberOptionsListIsOpen= true;
        }
        state.numberOptionsListIsOpen = numberOptionsListIsOpen;
        this.setState(state);
    }
    handlePhoneInputFields = async(type_id)=>{
       
        //increment the phone inputs array
        const state = {...this.state};
        //deep cloning
        const phonesArray = [...state.newContactInfo.phones];
        //edit
        phonesArray.push({  id:phonesArray.length + 1,
                            type_id: type_id, 
                            value: ""
                        });
        state.newContactInfo.phones = phonesArray;
        //toggle the numberOptionsListIsOpen
        await this.setState(state);
         this.handleNumberOptionsList();
        //update the state
        

      
    }
    handleChange =(e)=>{
        //clone the state
        const state={...this.state};

        //clone the newContactInfo property
        const {newContactInfo} =  state;

        let anotherNameToTheExactObj = {};
        // add information of the new contact (edit the property)
        switch(e.target.name){
            case "First name":
                newContactInfo.first_name = e.target.value;
                break;
            case "Last name":
                newContactInfo.last_name = e.target.value;
                break;
            case "Email address":
                newContactInfo.email = e.target.value;
                break;
            case "Home phone":
                /*
                this is the way to do a deep cloning
                const newObject = {...newContactInfo.phones.find(phone => phone.type_id === 2)};
                */
                
                //get the object 
                 anotherNameToTheExactObj = newContactInfo.phones.find(phone => phone.id === Number(e.target.id));
                //update value of this object
                anotherNameToTheExactObj.value = e.target.value;
                break;
            case "Mobile phone":
                //get the object 
                anotherNameToTheExactObj = newContactInfo.phones.find(phone => phone.id === Number(e.target.id));
                //update value of this object
                anotherNameToTheExactObj.value = e.target.value;
                break;
            case "Business phone":
                //get the object 
                 anotherNameToTheExactObj = newContactInfo.phones.find(phone => phone.id === Number(e.target.id));
                //update value of this object
                anotherNameToTheExactObj.value = e.target.value;
                break;
            case "Other phone":
                //get the object 
                 anotherNameToTheExactObj = newContactInfo.phones.find(phone => phone.id === Number(e.target.id));
                //update value of this object
                anotherNameToTheExactObj.value = e.target.value;
                break;
            case "Company":
                newContactInfo.company = e.target.value;
                break;
            case "Notes":
                newContactInfo.notes = e.target.value;
                break;
            default: return;
        }

        //set the full name
        newContactInfo.name = `${newContactInfo.first_name} ${newContactInfo.last_name}`;

        //update the state
        this.setState({...this.state, newContactInfo});
    }

    handleSubmit = async()=>{
        const {name, email, notes} = this.state.newContactInfo;

        let phones = [...this.state.newContactInfo.phones];
        phones = phones.map(phone => {
            return({type_id: phone.type_id, value: phone.value})
        });

        //dispatch the post new contact action
        await this.props.disPatch(postNewContact({name, email, notes, phones}));
        if(!this.props.error){
            //this function to add the new contact and update the contacts in the home state.
            this.props.updateContacts(this.props.response);
        }

        //exit the add form
        this.props.toggleAddForm();
    }
    render() {
        const phoneTypesArray = ["Home", "Mobile", "Business", "Other"]  //type_id = index + 1
        const {handleChange, handleSubmit} = this;
        const {toggleAddForm}=  this.props;
        const {email, first_name, last_name, company, notes, phones} = this.state.newContactInfo;
        const {numberOptionsListIsOpen} = this.state;
        console.log(this.state.newContactInfo.phones);
        return( 
            <div className="add-contact">
                <div className="card-container">
                    <div className="card">
                    <div className="left-div">
                        <h3>New contact</h3>
                        <p>
                        You can add more information than what you see here, such as address and birthday. Select <span>Add more</span> to bring up more options.
                        </p>
                    </div>
                    <div className="right-div">
                        <div className="container">
                                <span className="exit-icon" onClick={toggleAddForm}>
                                    <i className="fas fa-times"></i>
                                    </span>

                                    <div className="name-section">
                                        <span className="placeholder">
                                            <i className="far fa-user"></i>
                                        </span>
                                        <div className="input-holder">
                                            <InputField label={"First name"}
                                                        type={"text"}
                                                        id={"first_name"}
                                                        value={first_name}
                                                        backGroundColor={"#212121" }
                                                        color={"#fff"}
                                                        handleChange={handleChange}/>
                                            <InputField label={"Last name"} 
                                                        type={"text"} 
                                                        id={"last_name"}
                                                        value={last_name}
                                                        backGroundColor={"#212121"} 
                                                        color={"#fff"}
                                                        handleChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="contact-info-section">
                                        <h3>Contact information</h3>
                                        <InputField label={"Email address"} 
                                                    type={"email"}
                                                    value={email}
                                                    id={"email_address"}
                                                    color={"#fff" }
                                                    backGroundColor= {"#212121"}
                                                    handleChange={handleChange}/>
                                        {phones.map((obj, index)=>{
                                            return(
                                                <InputField key={index}
                                                            label={`${phoneTypesArray[obj.type_id - 1]} phone`}
                                                            type={"number"}
                                                            id={obj.id}
                                                            value={obj.value}
                                                            color={"#fff" }
                                                            backGroundColor= {"#212121"}
                                                            handleChange={handleChange}/>
                                            )
                                        })}
                                        
                                        

                                        
                                    </div>

                                    <div className="work-section">
                                        <h3>Work</h3>
                                        <InputField label={"Company"}
                                                    type={"text"}
                                                    id={"company"}
                                                    value={company}
                                                    color={"#fff"} 
                                                    backGroundColor= {"#212121"}
                                                    handleChange={handleChange}/>

                                        <h3>Notes</h3>
                                        <textarea name="Notes" placeholder="Add notes" value={notes} onChange={handleChange}/>
                                    </div>
                                
                                    
                                    <ul className="phone-options-section" style = {{display:numberOptionsListIsOpen?"block":"none"}}>
                                        <li className="option" onClick={() => this.handlePhoneInputFields(1)}>
                                            Home
                                        </li>
                                        <li className="option" onClick={() => this.handlePhoneInputFields(2)}>
                                            Mobile
                                        </li>
                                        <li className="option" onClick={() => this.handlePhoneInputFields(3)}>
                                            Business
                                        </li>
                                        <li className="option" onClick={() => this.handlePhoneInputFields(4)}>
                                            Other
                                        </li>
                                    </ul>
                            </div>
                            

                        <div className="footer-section">
                                <button className="submit-btn" onClick={handleSubmit}>Create</button>
                                <button className="discard-btn" onClick={toggleAddForm}>Discard</button>
                                <button className="add-phones-btn" onClick={this.handleNumberOptionsList}>
                                    <i className="fas fa-plus"></i> Add more phones
                                </button>
                        </div>

                            
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        response:state.responseOfAddnewContact.response,
        error: state.responseOfAddnewContact.error
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        disPatch: (action) => dispatch(action)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);