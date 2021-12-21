import http from "../http-common";

class UserDataService {

    login(data,config){
       
        return http.post("/user/login/",data,config)
    }

    getBuildingUnits(id){
        return http.get(`/user/building_units/${id}/`)
    }
 

}

export default new  UserDataService();