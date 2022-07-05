import {EMPLOYEE} from "./employee";

function findEmployeeById(emp_id){
    let employee = EMPLOYEE.filter((employee) => employee.emp_id === emp_id);
    if(employee.length === 0){
        return "";
    }else{
        return employee[0];
    }
}

export default findEmployeeById;