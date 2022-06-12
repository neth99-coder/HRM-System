import React from "react";
import Header from "../../Components/Header/Header";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import NavBar from "../../Components/Header/NavBarComponent/NavBarComponent";
import {useParams} from "react-router-dom";

function EmployeeEdit(props){

    let {emp_id} = useParams();

    return(
        <div>
            <EditProfile id={emp_id} departments={props.departments} type={props.type} status={props.status} paygrades={props.paygrades}/>
        </div>
    )
}

export default EmployeeEdit;