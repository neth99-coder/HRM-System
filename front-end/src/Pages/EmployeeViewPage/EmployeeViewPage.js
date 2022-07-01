import React from "react";
import { useEffect} from "react";
import ProfileView from "./ProfileViewComponent/ProfileViewComponent";
import {useParams} from "react-router-dom";
import Axios from "axios";
import {useState} from "react";
import {Spinner} from "react-bootstrap";
import styles from "../RequestPage/RequestPage.module.css";


/*
todo: add a field to store employee's profile picture
 */
function EmployeeView(props){

    const [isLoading, setIsLoading] = useState(true);
    const [getEmployee,setEmployee] = useState({});
    let {emp_id} = useParams();
    if(emp_id === null){
        emp_id = props.emp_id;
    }

    useEffect(()=>{
        setIsLoading(true);

        const findEmployee = async () => {
            await Axios.get("http://localhost:3001/api/employee/getemployee/"+ emp_id).then(
                (res) => {
                    setEmployee(res.data.result[0]);
                }
            );
        };
        findEmployee();
    },[]);


    return (


        <div>
            <ProfileView employee={getEmployee}/>
        </div>
    );
}

export default EmployeeView;