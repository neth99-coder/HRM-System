import React from "react";
import findEmployeeByID from "../../shared/findEmployeeByID";
import Profile from "./ProfileComponent/ProfileComponent";


function ProfileView(props){

    let employee = findEmployeeByID("AD-0001");

    return (
        <div>
            <Profile employee={employee}/>
        </div>
    );
}

export default ProfileView;