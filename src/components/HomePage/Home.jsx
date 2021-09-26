import React, { Component } from 'react';

import Button from './../Button/Button';

import { connect } from 'react-redux';

import { clearTokens } from './../../Jwt/token';
import { getContacts } from '../../Redux/Contacts/AsyncActions';

import "./Home.css";
class HomePage extends Component {
    componentDidMount = async()=>{
      await this.props.disPatch(getContacts())
      console.log(this.props.contacts.data);
    }
    logOut = ()=>{
        const {updateRoutes} = this.props;
        clearTokens();
        updateRoutes();
    }
    func = ()=>{
        const arr = this.props.cotacts.data.map((cont)=>{
            return(
                <h2>email</h2>
            )
        })
        return arr;
    }
    render() { 
        
        return (
            <div className="home">
                <div className="navbar" >
                    <Button logOut={this.logOut}  width={"150px"} height={"50px"} name={"Log Out"} />
                </div>
                <div> </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        contacts: state.contactsReq,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        disPatch : (action) => dispatch(action)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);