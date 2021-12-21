import React, { Component } from 'react';


import { BrowserRouter as  Router, Switch, Route, Link }  from "react-router-dom";

import logo from '../assets/images/logo.png';
import avathar1 from '../assets/images/avatar-1.jpg';

import Home from './home';
import Buildings from './buildings';
import Staffs from './sttafs';
import Vehicles from './vehicles';


const Nav = () =>{

    return (
       

        <Router>


            <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <a className="navbar-brand">
                    <img src={logo} width="128px" alt="swoop logo" />
                    <button type="button" className="btn btn-link"><i className="fa fa-fw fa-bars"></i></button>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right">
                        <li className="nav-item dropdown nav-user">
                            <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={avathar1} alt="" className="user-avatar-md rounded-circle" /></a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div className="nav-user-info">
                                    <h5 className="mb-0 text-white nav-user-name">Shahzad</h5>
                                    <span>Administrator</span>
                                </div>
                                <a className="dropdown-item" href="#"><i className="fas fa-user mr-2"></i>Account</a>
                                <a className="dropdown-item" href="#"><i className="fas fa-cog mr-2"></i>Setting</a>
                                <a className="dropdown-item" href="#"><i className="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        
            <div className="nav-left-sidebar sidebar-primary sidebar" id="mySidebar" style={{ width:"250px" }}>
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="d-xl-none d-lg-none" href="#">Navigation</a>

                    <div className="collapse navbar-collapse show" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item">
                                <a href="#" className="nav-link"><i className="fa fa-fw fa-times"></i></a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/home"><i className="fa fa-fw fa-columns"></i>Summary</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/buildings"><i className="fa fa-fw fa-building"></i>Buildings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/vehicles"><i className="fa fa-fw fa-car"></i>Vehicles</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/staffs"><i className="fa fa-fw fa-users"></i>Staff &amp; Teams</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="washes.php"><i className="fa fa-fw fa-tasks"></i>Washes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="manage-ots.php"><i className="fa fa-fw fa-car"></i>One-Time Services</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1-1" aria-controls="submenu-1-1"><i className="fas fa-fw fa-dollar-sign"></i> Accounts</a>
                                <div id="submenu-1-1" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="expences.php"><i className="fa fa-fw fa-dollar-sign"></i>Expenses</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="revenue.php"><i className="fa fa-fw fa-chart-pie"></i>Revenue</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="invoices.php"><i className="fa fa-fw fa-file"></i>Invoices</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="refunds.php"><i className="fa fa-fw fa-undo"></i>Refunds</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="inventory.php"><i className="fa fa-fw fa-archive"></i>Inventory</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="complaints.php"><i className="fa fa-fw fa-clipboard-list"></i>Complaints</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="customers.php"><i className="fa fa-fw fa-user-circle"></i>Customers</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="notifications.php"><i className="fa fa-fw fa-bell"></i>Notifiations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="offers.php"><i className="fa fa-fw fa-gift"></i>Offers</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            </div>


            <Switch>

                <Route path='/home' exact component={Home} />
                <Route path='/buildings'  component={Buildings} />
                <Route path='/staffs'  component={Staffs} />
                <Route path='/vehicles'  component={Vehicles} />

            </Switch>
       
    
        </Router>

      

    )



}

export default Nav;