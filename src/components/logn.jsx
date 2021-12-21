import React, { Component } from 'react';
import axios from 'axios';

import logo from '../assets/images/logo.png';

import UserDataService from "../services/user-services";

import { Redirect } from 'react-router';


class Login extends React.Component {


    constructor(props){

        super(props);
        this.state = {email:'',phone:''};
        this.emailChange = this.emailChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.getBuildingUnits = this.getBuildingUnits.bind(this);

    }



    emailChange = (event) =>{

        this.setState({
            email:event.target.value
        })

    }

    phoneChange = (event) =>{
        this.setState({
            phone: event.target.value
        })
    }

    userLogin = () =>{

        const params = new URLSearchParams()
        params.append('email', this.state.email)
        params.append('phone_no', this.state.phone)
       
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }


        console.log("Email: " + this.state.email + " Password: " + this.state.phone);
        var data = {
            email: this.state.email,
            phone_no: this.state.phone
          };
          console.log("Data:  " + JSON.stringify(data));
          UserDataService.login(params,config)
          .then(response => {
              if(response.data.success == true){
                
                console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
                return <Redirect to="/home" />
              }
              
          })
          .catch(e =>{
              console.log("Error : " + e);
          });
    }

    getBuildingUnits = () =>{

        let id = 1;
        UserDataService.getBuildingUnits(id)
        .then(res =>{
            console.log("Response: " + JSON.stringify(res.data));
        })
        .catch(err =>{
            console.log("Error"  + err);
        })

    }

        

    render() { 


        return <div className="login-bg" style={{ height:"100%",position: 'absolute',width:"100%" }}>
                <div  style={{ display:"-ms-flexbox",paddingTop:"4opx",paddingBottom:"40px",alignItems:"center",msFlexAlign:"center"}}>

                <div className="splash-container">
                    <div className="card">
                        <div className="card-header text-center"><img style={{width: "100%"}} className="logo-img" src={ logo } alt="logo" /></div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" id="email" type="text" value={this.state.email} placeholder="Email Address" onChange={this.emailChange} autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" id="phone" type="text" value={this.state.phone} onChange={this.phoneChange} placeholder="Phone No" />
                                </div>
                                <div className="form-group">
                                    <label className="custom-control custom-checkbox">
                                        <input className="custom-control-input" type="checkbox" /><span className="custom-control-label">Remember Me</span>
                                    </label>
                                </div>
                                <button type="button" onClick={this.userLogin} className="btn btn-primary btn-lg w-100">Sign in</button>
                            </form>
                        </div>
                     
                    </div>
                </div>
            
            </div>
            </div>;
    }
}
 
export default Login;