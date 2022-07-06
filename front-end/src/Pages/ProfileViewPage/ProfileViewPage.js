import React from "react";
import Profile from "./ProfileComponent/ProfileComponent";
import {useEffect, useState} from "react";
import Axios from "axios";
import {Spinner} from "react-bootstrap";
import styles from "../EmployeeViewPage/ProfileViewComponent/ProfileViewComponent.module.css";


function ProfileView(props){

    let emp_id = "190253K"
    const [isLoading, setIsLoading] = useState(true);
    const [getEmployee,setEmployee] = useState({});
    const [employeeFull,setEmployeeFull] =useState({});

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

        const findEmployeeFull = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getemployeeFull/" + emp_id).then(
                (res) => {
                    setEmployeeFull(res.data.result[0]);
                }
            );
        };
        findEmployeeFull();

        setIsLoading(false);
    },[]);

    return (
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <>
                    <Profile employee={getEmployee} employeeFull={employeeFull}/>
                </>
                )};
        </div>
    );
}

export default ProfileView;