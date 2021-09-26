import React from 'react';

import {Route, Switch, Redirect} from "react-router-dom";

import { getToken } from './../../Jwt/token';

import HomePage from '../HomePage/Home';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from './../LoginPage/Login';
import NotFound from '../NotFound/NotFound';

class Routes extends React.Component {
    updateRoutes=()=>{
        /*if(this.state.status){
            this.setState({status:0});
        }else{
            this.setState({status:0});
        }*/
        this.forceUpdate();
    }
    render() {
        const token = getToken("userToken");
        if(token){
            return ( 
                <React.Fragment>
                    <Switch>
                        <Route path="/home" render={()=><HomePage 
                                                                updateRoutes={this.updateRoutes} 
                                                                {...this.props}/>}/>
                        <Route path="/notfound" component={NotFound}/> 
                        <Redirect from="/login" to="/home"/>
                        <Redirect from="/register" to="/home"/>
                        <Redirect from="/" to="/home" exact/>
                        <Redirect to="/notfound"/>

                    </Switch>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <Switch>
                        <Route path="/register" component={RegisterPage}/> 
                        <Route path="/login"  render={()=><LoginPage 
                                                                updateRoutes={this.updateRoutes} 
                                                                {...this.props}/>}/>
                        <Route path="/notFound" component={NotFound}/>
                        <Redirect from="/home" to="/login" />
                        <Redirect from="/" to="/login" exact/>
                        <Redirect to ="/notfound" />
                    </Switch>
                </React.Fragment>
            )   
        }
    }
}
 
export default Routes;
 