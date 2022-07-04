import React, {useEffect, useState} from "react";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import {useParams} from "react-router-dom";
import Axios from "axios";
import styles from "../RequestPage/RequestPage.module.css";
import {Spinner} from "react-bootstrap";

function EmployeeEdit(props){

    let {emp_id} = useParams();

    return(
        <div>
                <>
                    <EditProfile empID= {emp_id}/>
                </>
        </div>
    );
};

export default EmployeeEdit;