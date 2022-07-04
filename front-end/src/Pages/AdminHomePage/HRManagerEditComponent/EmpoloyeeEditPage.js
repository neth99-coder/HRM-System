import React from "react";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import {useParams,useLocation} from "react-router-dom";

function EmployeeEdit(props){
    
    const location = useLocation();//route states
    const hrmanager = location.state;
    
    return(
        <div>
            <EditProfile employee={hrmanager} departments={props.departments} type={props.type} status={props.status} paygrades={props.paygrades}/>
        </div>
    )
}

export default EmployeeEdit;