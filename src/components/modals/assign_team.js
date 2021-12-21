import React,{useState, useEffect} from "react";
import { Modal, Row, Col,Button, Dropdown,Form } from "react-bootstrap";
import staffServices from "../../services/staff-services";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";


const AssignTeam = (props) => {

    const [alertShow, setAlertShow] = useState(false);
    const [selectedValue,setSelectedValue] = useState();

    const [allteams,setAllteams] = useState([]);

    const hideAlert = () => {
        setAlertShow(false);
    };

    useEffect(() => {


        const teams = async () =>{
            const response = await axios.get('http://127.0.0.1:8000/staff/all_teams/')
            setAllteams(response.data.data);
        }
        teams();

    },[]);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };


    const assignStaff = async () =>{

        const params = new URLSearchParams();
        params.append('staff',props.staffId.assignStaffId);
        params.append('team',selectedValue);
        params.append('is_assigned',1);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        try{
            const resp = await axios.post('http://127.0.0.1:8000/staff/assign_team/',params)
            console.log("Res: " +JSON.stringify(resp.data));
        }
        catch(err){
            console.log("Error:"+err);
        }

    }



    return (
    
        <div>
            
            <Modal size="sm" show={props.isDisplay} aria-labelledby="assignStaffModal" >
                <Modal.Header onClick={ () => {  props.dispayAllTeams() }} closeButton>
                    <Modal.Title>
                        Assign staff to team
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Select 
                        aria-label="Default select example" value={selectedValue} onChange={handleChange}>

                        <option>Choose Team</option>
                        { allteams.map((team) => (
                            <option value={team.id}>{team.name}</option>
                        )) }
                        
                       
                    </Form.Select>
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button className="rounded m-1" variant="secondary"  onClick={ () => props.dispayAllTeams() }>Close</Button>
                    <Button className="rounded m-1"  variant="primary" type="button" onClick={assignStaff}> Submit </Button> 
                </Modal.Footer>
            </Modal>

            <SweetAlert show={alertShow} success title="Done!" onConfirm={hideAlert} onCancel={hideAlert}>
                Team assigned successfully.
            </SweetAlert>

        </div>
    )

}

export default AssignTeam;