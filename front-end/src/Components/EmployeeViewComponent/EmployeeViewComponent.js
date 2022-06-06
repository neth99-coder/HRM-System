import React from "react";
import Header from "../Header/Header";
import NavBar from "../Header/NavBarComponent/NavBarComponent";
import findEmployeeByID from "../../shared/findEmployeeByID";
import ProfileView from "./ProfileViewComponent/ProfileViewComponent";


function EmployeeView(props){

    //const {emp_id} = useParams();
    //let employee = findEmployeeByID("AD-0001");
    let employee = {
        emp_id: "AD-0001",
        first_name: "Nethmi",
        middle_name: "Kavindya",
        last_name: "Jayakodi",
        email: "nethmi.19@cse.mrt.ac.lk",
        dept_id: 0,
        type_id: 0
    };

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