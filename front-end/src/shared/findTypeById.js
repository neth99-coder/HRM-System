import {TYPE} from "./employeeType";

function findTypeById(type_id){
    let type = TYPE.filter((emp_type) => emp_type.type_id === type_id);
    if(type.length === 0){
        return "";
    }else{
        return type[0].type_name;
    }
}

export default findTypeById;