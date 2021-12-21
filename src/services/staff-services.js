import http from '../http-common';

class StaffDataService {

    addNewStaff(data){
        return http.post("/staff/add_new_staff/",data);
    }

    addNewTeam(data){
        return http.post("/staff/add_new_team/",data);
    }

    unassingedStaffs(){
        return http.get("/staff/unassigned_staffs/");
    }

    

}

export default new StaffDataService();