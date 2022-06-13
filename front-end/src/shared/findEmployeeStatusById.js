import {EMPLOYEESTATUS} from "./employeeStatus";

function findEmployeeStatusById(status_id){
    let type = EMPLOYEESTATUS.filter((emp_type) => emp_type.emp_status_id === status_id);
    if(type.length === 0){
        return "";
    }else{
        let time = "full time";
        if(type[0].is_full_time === 0){
            time = "part time";
        }

        return(type[0].name + " - " + time);
    }
}

export default findEmployeeStatusById;