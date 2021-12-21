import React, { Component } from 'react';

import Nav from './nav';

class Home extends React.Component {
    render() { 

        

        return (
        

                <div className="dashboard-wrapper" id="main" style={{ marginLeft:"250px" }}>
                    <div className="dashboard-ecommerce">
                        <div className="container-fluid dashboard-content">               
             
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="page-header">
                                        <h2 className="pageheader-title">Home</h2>
                                        <label className="text-muted">Home Page.</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>   
                </div>     
         
        );
    }
}
 
export default Home;