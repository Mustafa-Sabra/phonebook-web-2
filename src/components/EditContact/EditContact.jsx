import { React, Component } from "react";

import { connect } from "react-redux";

import { editContact } from "../../Redux/EditContact/EditContactAsyncActions";

import { addNewPhone } from "../../Redux/AddNewPhone/AddPhoneAsyncActions";

import "./EditContact.css"

class EditContact extends Component {
    state = {
        contactsArray: [],
        currentContactInfo: {
            name: "",
            email: "",
            notes: "",
            phones: [{
                id: 1,
                type_id: 2,
                value: ""
            }]
        },
        phoneOptionsListIsOpen: false,
        editContactValidationErrors: {}
    }
    componentDidMount = async () => {

        const { contactsArray } = this.props;
        await this.setState({ contactsArray });

        const currentId = this.props.location.pathname.split("/")[3];

        const currentContact = {...this.state.contactsArray.find(contact => contact.id === Number(currentId))};

        //update the currentContactInfo object
        const currentContactInfo = { ...this.state.currentContactInfo };
        currentContactInfo.name = currentContact.name;
        currentContactInfo.email = currentContact.email;
        currentContactInfo.phones = currentContact.phones;

        this.setState({ currentContactInfo })
    }
    pushNewPhone = async (type_id) => {

        //increment the phone inputs array
        const state = { ...this.state };
        //deep cloning
        const phonesArray = [...state.currentContactInfo.phones];
        //edit
        phonesArray.push({
            id: phonesArray.length + 1,
            type_id: type_id,
            value: ""
        });
        state.currentContactInfo.phones = phonesArray;
        //toggle the numberOptionsListIsOpen
        await this.setState(state);

        this.handlePhoneOptionsList();
        //update the state
    }
    handlePhoneOptionsList = () => {
        const state = { ...this.state };
        let { phoneOptionsListIsOpen } = state;
        if (phoneOptionsListIsOpen) {
            phoneOptionsListIsOpen = false;
        } else {
            phoneOptionsListIsOpen = true;
        }
        state.phoneOptionsListIsOpen = phoneOptionsListIsOpen;
        this.setState(state);
    }
    handleChange = (e) => {
        const currentContactInfo = { ...this.state.currentContactInfo };
        const phones = [...currentContactInfo.phones];
        let phone = {};
        switch (e.currentTarget.name) {
            case "full-name":
                currentContactInfo.name = e.currentTarget.value;
                break;
            case "email":
                currentContactInfo.email = e.currentTarget.value;
                break;
            case "mobile phone":

                phone = phones.find(phone => phone.id === Number(e.currentTarget.id));
                phone.value = e.currentTarget.value;
                currentContactInfo.phones = phones;
                break;
            case "home phone":

                phone = phones.find(phone => phone.id === Number(e.currentTarget.id));
                phone.value = e.currentTarget.value;
                currentContactInfo.phones = phones;
                break;
            case "business phone":

                phone = phones.find(phone => phone.id === Number(e.currentTarget.id));
                phone.value = e.currentTarget.value;
                currentContactInfo.phones = phones;
                break;
            case "other phone":

                phone = phones.find(phone => phone.id === Number(e.currentTarget.id));
                phone.value = e.currentTarget.value;
                currentContactInfo.phones = phones;
                break;
            default: return
        }
        this.setState({ currentContactInfo });
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        await this.nameValidation();
        await this.emailValidation();
        await this.phoneValidation();

        const errorsKeysArray = Object.keys(this.state.editContactValidationErrors);

        if (errorsKeysArray.length === 0) { //check if there is an error or not
            const { name, email, notes } = this.state.currentContactInfo;

            const currentId = this.props.location.pathname.split("/")[3];
            //dispatch the post new contact action
            await this.props.disPatch(editContact({ name, email, notes }, currentId));

            if (!this.props.error) {
                //this function to add the new contact and update the contacts in the home state.
                this.props.updateContactsAfterEdit(this.props.responseData);
            }

            const oldPhones = this.state.contactsArray.find(contact => contact.id === Number(currentId)).phones;
            const newPhones = [...this.state.currentContactInfo.phones];

            if(newPhones.length < oldPhones.length){
                //phone deleted
                //deletePhone(oldPhones, newPhones);
            }else if(newPhones.length > oldPhones.length){
                //phone addited
                this.addPhone(oldPhones, newPhones);
            }else{
                //phone edited
            }
            

            /*
            phones = phones.map(phone => {
                return ({ type_id: phone.type_id, value: phone.value });
            });
*/
            //exit the add form
            this.props.toggleEditForm();
        }

    }
    
    addPhone = (oldPhones, newPhones)=>{
        const oldIds = oldPhones.map(phone => phone.id);
        const newIds = newPhones.map(phone => phone.id);
        const addedIds = newIds.filter(id => oldIds.indexOf(id) === -1);
        const addedPhones = newPhones.filter(phone => addedIds.indexOf(phone.id) !== -1);
        const contact_id = this.props.location.pathname.split("/")[3];

        this.props.updateInfoAfterAddingNewPhones(addedPhones, contact_id);
        try{
            this.props.disPatch(addNewPhone(addedPhones, contact_id));
        }catch(error){
            
        }
    }
    
    nameValidation = () => {
        const errors = { ...this.state.editContactValidationErrors };
        const { name } = this.state.currentContactInfo;
        if (!name) {
            errors.name = "Name can't be empty";
        } else if (name.length < 8) {
            errors.name = "Name should be more than 8 characters";
        } else {
            delete errors.name;
        }
        this.setState({ editContactValidationErrors: errors });
    }
    emailValidation = () => {
        const errors = { ...this.state.editContactValidationErrors };
        const { email } = this.state.currentContactInfo;
        const sign = email.split("").find(char => char === "@");
        if (!email) {
            errors.email = "Emeil can't be empty";
        } else if (email.length < 12) {
            errors.email = "Email should be more than 12 characters";
        } else if (!sign) {
            errors.email = "Email should contain @ character";
        } else {
            delete errors.email;
        }
        this.setState({ editContactValidationErrors: errors });
    }
    phoneValidation = () => {
        const errors = { ...this.state.editContactValidationErrors };
        const phones = [...this.state.currentContactInfo.phones];

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
            if (phone.value) {
                allValuesAreEmpty = false;
            }
            if (isNaN(phone.value)) {
                phoneIsNaN = true;
            }
        });
        if (allValuesAreEmpty) {
            errors.phone = "Phone number can't be empty";
        } else if (phoneIsNaN) {
            errors.phone = "Phone Must be number";
        } else {
            delete errors.phone;
        }

        this.setState({ editContactValidationErrors: errors });
    }
    render() {
        const { phoneOptionsListIsOpen, editContactValidationErrors } = this.state;
        const { toggleEditForm } = this.props;
        const { name, email, phones } = this.state.currentContactInfo;
        const phoneTypesArray = ["home", "mobile", "business", "other"]  //type_id = index + 1
        const editContactValidationErrorsKeys = Object.keys(this.state.editContactValidationErrors);
        
        return (
            <div className="edit-contact">
                <div className="card-container">
                    <div className="card">
                        <div className="left-div">
                            <h3>Edit contact</h3>
                            <p>
                                You can add more information than what you see here, such as more phone numbers. Select <span>Add more</span> to bring up more options.
                            </p>
                            <div className="errors-container">
                                {editContactValidationErrorsKeys.map((error, index) => {
                                    return (
                                        <p key={index} className="err-msg">
                                            <i className="fas fa-times-circle" ></i>{editContactValidationErrors[error]}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="right-div">
                            <span className="exit-icon" onClick={toggleEditForm}>
                                <i className="fas fa-times"></i>
                            </span>

                            <div className="container">
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="name-section">
                                        <span className="placeholder">
                                            <i className="far fa-user"></i>
                                        </span>

                                        <div className="input-holder">
                                            <div className="input-group">
                                                <label htmlFor="full name">Full name</label>
                                                <input name="full-name"
                                                    id="full name"
                                                    value={name}
                                                    onChange={this.handleChange} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="contact-info-section">
                                        <h3>Contact information</h3>
                                        <div className="input-group">
                                            <label htmlFor="email">Email</label>
                                            <input name="email"
                                                id="email"
                                                value={email}
                                                onChange={this.handleChange} />
                                        </div>
                                        {phones.map((number, index) => {
                                            return (
                                                <div className="input-group" key={index}>
                                                    <label htmlFor={number.id}>{`${phoneTypesArray[number.type_id - 1]} phone`}</label>
                                                    <input
                                                        name={`${phoneTypesArray[number.type_id - 1]} phone`}
                                                        type={"number"}
                                                        id={number.id}
                                                        value={number.value}
                                                        onChange={this.handleChange} />
                                                </div>

                                            )
                                        })}

                                    </div>

                                    <div className="work-section">
                                        <h3>Notes</h3>
                                        <textarea name="Notes"
                                            placeholder="Add notes"
                                        />
                                    </div>

                                    <ul className="phone-options-section" style={{ display: phoneOptionsListIsOpen ? "block" : "none" }}>
                                        <li className="option" onClick={() => this.pushNewPhone(1)}>
                                            Home
                                        </li>
                                        <li className="option" onClick={() => this.pushNewPhone(2)}>
                                            Mobile
                                        </li>
                                        <li className="option" onClick={() => this.pushNewPhone(3)}>
                                            Business
                                        </li>
                                        <li className="option" onClick={() => this.pushNewPhone(4)}>
                                            Other
                                        </li>
                                    </ul>

                                    <div className="footer-section">
                                        <button className="submit">Create</button>
                                        <span className="discard-btn" onClick={toggleEditForm}>Discard</span>
                                        <span className="add-phones-btn" onClick={this.handlePhoneOptionsList}>
                                            <i className="fas fa-plus"></i>  phones
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
        contactsArray: state.contactsReq.data,
        error: state.responseOfEditContact.error,
        responseData: state.responseOfEditContact.data,
        addNewPhonesResponseArray:state.addNewPhoneResponse
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        disPatch: (action) => dispatch(action),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditContact);