import React from "react";
import Header from "../Header/Header";
import NavBar from "../Header/NavBarComponent/NavBarComponent";
import findEmployeeByID from "../../shared/findEmployeeByID";
import ProfileView from "./ProfileViewComponent/ProfileViewComponent";
import {useParams} from "react-router-dom";


function EmployeeView(props){

    let {emp_id} = useParams();
    let employee = findEmployeeByID(emp_id);

    return (


        <div>
            <Header companyDetails={props.companyDetails} profileDetails={props.profileDetails}/>
            <div className="mt-1">
                <NavBar/>
            </div>
            <div>
                <ProfileView employee={employee}/>
            </div>
        </div>
    );
}

export default EmployeeView;