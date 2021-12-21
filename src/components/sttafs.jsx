import React, {useState,useEffect}  from 'react';

import { Button, Modal , Form,Row, Col,FloatingLabel} from 'react-bootstrap';

import staffServices from '../services/staff-services';

import AddTeam from './modals/add_team';
import AssignTeam from './modals/assign_team';


const Staffs = () => {

     const [change, setChange] = useState(false);  
     const [validated,setValidate] = useState(false);
     const [selectedFile,setSelectedFile] = useState(null);
     const [isShow,setShow] = useState(false);
     const [assignStaffId, setAssignStaffId] = useState();

     const [isTeamShow,setTeamShow] = useState(false);

     const initialValues = {                   // type all the fields you need
                            name: '',
                            email: '',
                            phone:'',
                            password: ''
                          };

     const [inputField ,setInputField] = useState(initialValues);
     const [unStaffList,setUnassignedStaffs] = useState([]);

     useEffect(() => {
       
        staffServices.unassingedStaffs()
          .then(response =>{

            if (response.data.success == true){
              // console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
              setUnassignedStaffs(response.data.data);
            }
            else{
              // console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
            }
          })
          .catch(e => {
            console.log("Error : " + e);
          })


     });

    const handleChange = (e) => {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,

      });
    };

    
    const handleIsShow  = () => {

      setShow ( {
         isShow: !isShow
       })

       console.log("Is Show : "  +isShow);
    };

    const handleTeamList = (staff_id) => {
      setTeamShow({
        isTeamShow: !isTeamShow
      })
      setAssignStaffId({
        assignStaffId: staff_id
      })

      console.log("hhh:",assignStaffId)
    }


    const handleSubmit = (event) => {
      
      const form = event.currentTarget;
      if(form.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
      }
      setValidate(true);
      
      event.preventDefault();  
      console.log("selected file: " + selectedFile);
      if(form.checkValidity() === true){
        addNewStaff();
        // event.target.reset();
      }
    };


   const addNewStaff =  () => {

      let formdata = new FormData();
      formdata.append("name",inputField.name);
      formdata.append("email",inputField.email);
      formdata.append("phone",inputField.phone);
      formdata.append("password",inputField.password);

      if (selectedFile)
        formdata.append("staff_image",selectedFile[0]);
      

      staffServices.addNewStaff(formdata)
        .then(response =>{

          if (response.data.success == true){
            // console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
            setInputField(initialValues);
            setChange(false);
          }
          else{
            // console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
          }
        })
        .catch(e => {
          console.log("Error : " + e);
        })
    }

    return (
    

        <div className="dashboard-wrapper" id="main" style={{ marginLeft:"250px"}}>
            <div className="dashboard-ecommerce">
                <div className="container-fluid dashboard-content">               
     
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-header">
                      <h2 className="pageheader-title mb-3">Staff Overview</h2>
                        <div className="btn-group" role="group" aria-label="Basic example">

                           <a onClick= { () => setChange(!change) } className="btn btn-sm btn-primary"><i className="fa fa-fw fa-user-plus"></i> Add Staff</a>
                           
                           
                            <a onClick={ handleIsShow }  className="btn btn-sm btn-warning"><i className="fa fa-fw fa-user-plus"></i> Add Teams</a>
                            
                            <a href="#" className="btn btn-sm btn-success"><i className="fa fa-fw fa-map"></i> Location</a>

                        </div>
                    </div>
                  </div>
                </div>
                    
                    <div className="ecommerce-widget">


                      <div className="row mb-4">
                        <div className="col-md-12">
                        <div className="card mb-1">
                          <div className="card-body p-3">
                            <h3>Unassigned Staffs</h3>
                            <div className="table-responsive">
                             
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Total Washes</th>
                                    <th>Avg Wash Time</th>
                                    <th>Assign</th>
                                  </tr>
                                </thead>
                                <tbody>

                                { unStaffList.map((staff) =>(
                                    <tr>
                                      <td>{staff.name}</td>
                                      <td>{staff.wash_count}</td>
                                      <td>{staff.phone}</td>
                                      <td>
                                       
                                        <a onClick={  () => handleTeamList(staff.id) }  className="btn btn-xs btn-success">Assign</a>
                                       
                                      </td>
                                    </tr>

                                  ))}

                                  </tbody>
                                </table>
                               
                                 { unStaffList.length === 0 &&   <h6  className="mb-0 text-danger">  All staffs are assigned</h6> }
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="card mb-1">
                                    <div className="card-body p-3">
                                        <h3>Rogers <span style={{ float: "right" }}><a href="team-details.php" className="btn btn-primary btn-sm">Manage</a></span></h3>
                                        <div className="progress mt-4">
                                          <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                                          <div className="progress-bar bg-danger" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                              <thead>
                                                <tr>
                                                    <th>Members</th>  
                                                    <th>Completed</th>  
                                                    <th>Overdue</th>  
                                                    <th>Avg. Wash Time</th>  
                                                </tr>  
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-dark"><i className="fi-crown h5"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>  
                                              </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            
                             <div className="col-md-6">
                                <div className="card mb-1">
                                    <div className="card-body p-3">
                                        <h3>Wendys <span style={{ float: "right" }}><a href="team-details.php" className="btn btn-primary btn-sm">Manage</a></span></h3>
                                        <div className="progress mt-4">
                                          <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                                          <div className="progress-bar bg-danger" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                              <thead>
                                                <tr>
                                                    <th>Members</th>  
                                                    <th>Completed</th>  
                                                    <th>Overdue</th>  
                                                    <th>Avg. Wash Time</th>  
                                                </tr>  
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-dark"><i className="fi-crown h5"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>
                                                <tr>
                                                  <td><a href="cleaner-profile.php" className="text-primary"><i className="fa fa-fw fa-user"></i> Usman Ali</a></td>
                                                  <td className="text-success"><strong>921</strong></td>
                                                  <td className="text-danger"><strong>54</strong></td>
                                                  <td><strong>12 mins</strong></td>
                                                </tr>  
                                              </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            
                        </div>
                        
                    </div>

                  <Modal show={change} aria-labelledby="contained-modal-title-vcenter" centered>
                      <Modal.Header  onClick={ () => setChange(!change) } closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                             Create Staff
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridname">
                              <Form.Label>Staff name</Form.Label>
                             
                              <Form.Control name="name" value={inputField.name} onChange={handleChange}  className="rounded" type="text" placeholder="Enter full name" required />
                              <Form.Control.Feedback type="invalid">
                                  Please enter username.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridUpload">
                              <Form.Label>Upload Photo</Form.Label>
                              <Form.Control label={selectedFile} onChange={ (e) => setSelectedFile(e.target.files) } className="rounded" type="file" />
                            </Form.Group>

                          </Row>

                          <Row className="mb-3">

                            <Form.Group as={Col} controlId="formEmail">
                              <Form.Label>Staff Email</Form.Label>
                              <Form.Control name="email" value={inputField.email} onChange={handleChange} className="rounded" type="email" placeholder="Enter Emial Id"  required />
                              <Form.Control.Feedback type="invalid">
                                  email is required.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formPhone">
                              <Form.Label>Staff Phone</Form.Label>
                              <Form.Control name="phone" value={inputField.phone} onChange={handleChange} className="rounded" type="number" placeholder="Enter phone no" required />
                              <Form.Control.Feedback type="invalid">
                                   phone is required.
                              </Form.Control.Feedback>
                            </Form.Group>


                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control name="password" value={inputField.password} onChange={handleChange} className="rounded" type="password" placeholder="Enter password" required minLength="8" />
                              <Form.Control.Feedback type="invalid">
                                 password is required.
                              </Form.Control.Feedback>
                            </Form.Group>

                          </Row>

                            <div className="mr-3" style={{ textAlign: "right"}}>          
                              <Button  className="rounded m-1" variant="danger" onClick={ () => setChange(!change) }>Close</Button>              
                              <Button className="rounded m-1"  variant="primary" type="submit"> Submit </Button> 
                        
                            </div>

                        </Form>
                      </Modal.Body>
                    </Modal>

                    <AddTeam show={isShow} showModal={ () => setShow(!isShow) } />
                    <AssignTeam isDisplay={isTeamShow} staffId={assignStaffId} dispayAllTeams={ () => setTeamShow(!isTeamShow) } />

                    


            <div className="modal fade" id="assignTeamModal" tabIndex="-1" role="dialog" aria-labelledby="assignTeamModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="assignTeamModalLabel">Assign staff to team</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button><br/>
                    </div>
                    <div className="modal-body">

                      <form id="assignStaffTeamForm" method="post" action="{{Route('assignStaffTeam')}}">                      
                        <div className="row">
                          <div className="col-md-12">
                           
                            <div className="form-group">
                              <select id="selectTeam" name="team_id" className="custom-select">
                                <option defaultValue value="">Choose Team</option>
                                @foreach($teams as $team)
                                <option value="1">test</option>
                                @endforeach
                              </select>
                            </div>
                          </div>
                        </div>            
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Done</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
    

                </div>
            </div>   
        </div>     
    

    );

}

export default Staffs;