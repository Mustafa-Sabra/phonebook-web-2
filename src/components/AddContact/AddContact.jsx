import React, { Component } from 'react'
import { connect } from "react-redux";

import InputField from "../InputField/InputField"

import "./AddContact.css"
import { postNewContact } from './../../Redux/AddContact/AddContactAsyncActions';

class AddContact extends Component {
    state = {
        newContactInfo: {
            email: "",
            name: "",
            first_name: "",
            last_name: "",
            company: "",
            notes: "",
            phones: [
                {
                    id: 1,
                    type_id: 2,
                    value: "",
                }
            ],
        },
        addContactValidationErrors:{},
        numberOptionsListIsOpen: false,
        phoneInputsArray: [{ type: "Mobile", id: 2 }]
    }
    handleNumberOptionsList = () => {
        const state = { ...this.state };
        let { numberOptionsListIsOpen } = state;
        if (numberOptionsListIsOpen) {
            numberOptionsListIsOpen = false;
        } else {
            numberOptionsListIsOpen = true;
        }
        state.numberOptionsListIsOpen = numberOptionsListIsOpen;
        this.setState(state);
    }
    handlePhoneInputFields = async (type_id) => {

        //increment the phone inputs array
        const state = { ...this.state };
        //deep cloning
        const phonesArray = [...state.newContactInfo.phones];
        //edit
        phonesArray.push({
            id: phonesArray.length + 1,
            type_id: type_id,
            value: ""
        });
        state.newContactInfo.phones = phonesArray;
        //toggle the numberOptionsListIsOpen
        await this.setState(state);
        this.handleNumberOptionsList();
        //update the state
    }
    handleChange = (e) => {
        //clone the state
        const state = { ...this.state };

        //clone the newContactInfo property
        const { newContactInfo } = state;

        let anotherNameToTheExactObj = {};
        // add information of the new contact (edit the property)
        switch (e.target.name) {
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
        this.setState({ ...this.state, newContactInfo });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        //name validation
        await this.nameValidation();
        //email validation
        await this.emailValidation();
        //number validation
        await this.phoneValidation();

        const errorsKeysArray = Object.keys(this.state.addContactValidationErrors);

        if(errorsKeysArray.length === 0){ //check if there is an error or not
            const { name, email, notes } = this.state.newContactInfo;

            let phones = [...this.state.newContactInfo.phones];
            phones = phones.map(phone => {
                return ({ type_id: phone.type_id, value: phone.value })
            });

            //dispatch the post new contact action
            await this.props.disPatch(postNewContact({ name, email, notes, phones }));
            if (!this.props.error) {
                //this function to add the new contact and update the contacts in the home state.
                this.props.updateContactsAfterAddition(this.props.response);
            }

            //exit the add form
            this.props.toggleAddForm();
        }
        
    }
    nameValidation = ()=>{
        const errors = {...this.state.addContactValidationErrors};
        const {name}= this.state.newContactInfo;
        if(!name){
            errors.name = "Name can't be empty";
        }else if(name.length < 8){
            errors.name = "Name should be more than 8 characters";
        }else{
            delete errors.name ;
        }
        this.setState({addContactValidationErrors:errors});
    }
    emailValidation =  ()=>{
        const errors = {...this.state.addContactValidationErrors};
        const {email} = this.state.newContactInfo;
        const sign = email.split("").find(char => char === "@");
        if(!email){
            errors.email = "Emeil can't be empty";
        }else if(email.length < 12){
            errors.email = "Email should be more than 12 characters";
        }else if(!sign){
            errors.email = "Email should contain @ character";
        }else{
            delete errors.email ;
        }
        this.setState({addContactValidationErrors:errors});
    }
    phoneValidation = ()=>{
        const errors = {...this.state.addContactValidationErrors};
        const phones = [...this.state.newContactInfo.phones];

        /*
        //check if there is at least one number
        if(phones.length === 1){
            if(!phones[0].value){
                errors.phone = "Phone number can't be empty";
            }else if(isNaN(phones[0].value)){
                errors.phone = "Phone Must be number";
            }else{
                delete errors.phone;
            }

        }else{
            */
            let allValuesAreEmpty = true;
            let phoneIsNaN = false;
            phones.forEach(phone => {
                if(phone.value){
                    allValuesAreEmpty = false;
                }
                if(isNaN(phone.value)){
                    phoneIsNaN = true;
                }
            });
            if(allValuesAreEmpty){
                errors.phone = "Phone number can't be empty";
            }else if(phoneIsNaN){
                errors.phone = "Phone Must be number";
            }else{
                delete errors.phone;
            }

        this.setState({addContactValidationErrors:errors});
    }
    render() {
        const phoneTypesArray = ["Home", "Mobile", "Business", "Other"]  //type_id = index + 1
        const { handleChange, handleSubmit } = this;
        const { toggleAddForm } = this.props;
        const { email, first_name, last_name, company, notes, phones } = this.state.newContactInfo;
        const { numberOptionsListIsOpen } = this.state;
        
        //this is an array stores the keys of the errors keys => ["name", "email", ........]
        const addContactValidationErrorsKeys = Object.keys(this.state.addContactValidationErrors);

        const {addContactValidationErrors} = this.state;

        return (
            <div className="add-contact">
                <div className="card-container">
                    <div className="card">
                        <div className="left-div">
                            <h3>New contact</h3>
                            <p>
                                You can add more information than what you see here, such as more phone numbers. Select <span>Add more</span> to bring up more options.
                            </p>
                            <div className="errors-container">
                                { addContactValidationErrorsKeys.map((error, index) => {
                                    return(
                                        <p key={index} className="err-msg"><i className="fas fa-times-circle" ></i>{addContactValidationErrors[error]}</p>
                                    )
                                })}
                            </div>
                           
                        </div>
                        <div className="right-div">
                            <span className="exit-icon" onClick={toggleAddForm}>
                                <i className="fas fa-times"></i>
                            </span>
                            <div className="container">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="name-section">
                                        <span className="placeholder">
                                            <i className="far fa-user"></i>
                                        </span>
                                        <div className="input-holder">
                                            <InputField label={"First name"}
                                                type={"text"}
                                                id={"first_name"}
                                                value={first_name}
                                                backGroundColor={"#212121"}
                                                color={"#fff"}
                                                handleChange={handleChange} />
                                            <InputField label={"Last name"}
                                                type={"text"}
                                                id={"last_name"}
                                                value={last_name}
                                                backGroundColor={"#212121"}
                                                color={"#fff"}
                                                handleChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="contact-info-section">
                                        <h3>Contact information</h3>
                                        <InputField label={"Email address"}
                                            type={"email"}
                                            value={email}
                                            id={"email_address"}
                                            color={"#fff"}
                                            backGroundColor={"#212121"}
                                            handleChange={handleChange} />
                                        {phones.map((obj, index) => {
                                            return (
                                                <InputField key={index}
                                                    label={`${phoneTypesArray[obj.type_id - 1]} phone`}
                                                    type={"number"}
                                                    id={obj.id}
                                                    value={obj.value}
                                                    color={"#fff"}
                                                    backGroundColor={"#212121"}
                                                    handleChange={handleChange} />
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
                                            backGroundColor={"#212121"}
                                            handleChange={handleChange} />

                                        <h3>Notes</h3>
                                        <textarea name="Notes" placeholder="Add notes" value={notes} onChange={handleChange} />
                                    </div>


                                    <ul className="phone-options-section" style={{ display: numberOptionsListIsOpen ? "block" : "none" }}>
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

                                    <div className="footer-section">
                                        <button className="submit">Create</button>
                                        <span className="discard-btn" onClick={toggleAddForm}>Discard</span>
                                        <span className="add-phones-btn" onClick={this.handleNumberOptionsList}>
                                            <i className="fas fa-plus"></i> Add more phones
                                        </span>
                                    </div>
                                </form>

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        response: state.responseOfAddnewContact.response,
        error: state.responseOfAddnewContact.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        disPatch: (action) => dispatch(action)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);