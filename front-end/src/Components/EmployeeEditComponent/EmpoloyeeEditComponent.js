import React from "react";
import Header from "../Header/Header";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import NavBar from "../Header/NavBarComponent/NavBarComponent";
import {useParams} from "react-router-dom";

function EmployeeEdit(props){

    let {emp_id} = useParams();

    return(
        <div>
            <Header companyDetails={props.companyDetails} profileDetails={props.profileDetails}/>
            <NavBar />
            <EditProfile id={emp_id} departments={props.departments} type={props.type} status={props.status} paygrades={props.paygrades}/>
        </div>
    )
}

export default EmployeeEdit;