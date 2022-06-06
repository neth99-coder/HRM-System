import {DEPARTMENT} from "./department";

function findTypeById(dept_id){
    let department = DEPARTMENT.filter((dept) => dept.id === dept_id);
    if(department.length === 0){
        return "";
    }else{
        return department[0];
    }
}

export default findTypeById;