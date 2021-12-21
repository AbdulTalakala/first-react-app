import { render } from '@testing-library/react';
import React ,{useState} from 'react';
import {Modal , Form,Row, Col, Button} from 'react-bootstrap';
import staffServices from '../../services/staff-services';
import SweetAlert from 'react-bootstrap-sweetalert';

const AddTeam = (props) => {
    
    
    const [validated,setValidate] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
  
    const initialValues = {                   // type all the fields you need
      team_name: ''
    };

    const [inputField ,setInputField] = useState(initialValues);
    const handleTeamChange = (e) => {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,

      });
      console.log("Team Name: " +inputField.team_name);
    }

    const hideAlert = () => {

      setAlertShow(false);
      console.log("called hide alert");

    }

    

    const handleTeamSubmit = (event) => {

      console.log("Submited add team form..");
        const form  = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }

        setValidate(true)

        if(form.checkValidity() === true){
          event.preventDefault();
            addNewTeam();
        }

    };

  

    const addNewTeam = () => {

        const params = new URLSearchParams();
        params.append('name', inputField.team_name);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        staffServices.addNewTeam(params,config)
        .then(response =>{

            if (response.data.success == true){
              console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
              setInputField({
                    team_name : ""
                })
              
              props.showModal()       
              setAlertShow(true);
             
              setTimeout(() => {
                setAlertShow(false);
              }, 1000);
             

            }
            else{
              console.log("Response: " + JSON.stringify(response.data) + " status: " + response.data.success);
            }
          })
          .catch(e => {
            console.log("Error : " + e);
          })

    };


     return (
       <div>
        <Modal show={props.show} aria-labelledby="addStaffModal" centered>
        <Modal.Header  onClick={ () => props.showModal() } closeButton>
          <Modal.Title id="addStaffModal">
               Create Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleTeamSubmit}>
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridname">
                <Form.Label>Staff name</Form.Label>
               
                <Form.Control name="team_name"  onChange={handleTeamChange}  className="rounded" type="text"  value={inputField.team_name} placeholder="Enter team name" required />
                <Form.Control.Feedback type="invalid">
                    Please enter team name.
                </Form.Control.Feedback>
              </Form.Group>

            </Row>

              <div className="mr-3" style={{ textAlign: "right"}}>          
                <Button  className="rounded m-1" variant="danger" onClick={ () => props.showModal() }>Close</Button>              
                <Button className="rounded m-1"  variant="primary" type="submit"> Submit </Button> 
          
              </div>

          </Form>
        </Modal.Body>
      </Modal>

      <SweetAlert show={alertShow} success title="Done!" onConfirm={hideAlert} onCancel={hideAlert}>
        New Team Added.
      </SweetAlert>


      </div>



     );
     
}

export default AddTeam;