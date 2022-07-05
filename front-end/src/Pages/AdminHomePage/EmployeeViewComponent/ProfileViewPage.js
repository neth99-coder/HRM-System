import React from "react";
import {useLocation} from 'react-router-dom'
import Profile from "./ProfileComponent/ProfileComponent";


function ProfileView(props){

    const location = useLocation();
    const employee = location.state;

    return (
        <div>
            <Profile employee={employee}/>
        </div>
    );
}

export default ProfileView;