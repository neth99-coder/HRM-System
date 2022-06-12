import React from "react";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/Header/NavBarComponent/NavBarComponent";
import findEmployeeByID from "../../shared/findEmployeeByID";
import ProfileView from "./ProfileViewComponent/ProfileViewComponent";
import {useParams} from "react-router-dom";


function EmployeeView(props){

    let {emp_id} = useParams();
    if(emp_id === null){
        emp_id = props.emp_id;
    }
    let employee = findEmployeeByID(emp_id);

    return (


        <div>
            <ProfileView employee={employee}/>
        </div>
    );
}

export default EmployeeView;