import React from "react";
import Header from "../Header/Header";
import EditProfile from "./EditProfileComponent/EditProfileComponent";

function EmployeeEdit(props){

    return(
        <div>
            <Header companyDetails={props.companyDetails} profileDetails={props.profileDetails}/>
            <EditProfile id={props.id} departments={props.departments} type={props.type} status={props.status} paygrades={props.paygrades}/>
        </div>
    )
}

export default EmployeeEdit;