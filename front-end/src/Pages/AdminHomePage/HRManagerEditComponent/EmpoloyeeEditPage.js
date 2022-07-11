import React, {useEffect, useState} from "react";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import {useParams} from "react-router-dom";
import Axios from "axios";
import styles from "../../RequestPage/RequestPage.module.css";
import {Spinner} from "react-bootstrap";
import authService from "../../../services/auth.service";

function EmployeeEdit(props){

    const [isLoading, setIsLoading] = useState(true);
    const [getEmployee,setEmployee] = useState({});
    const [employeeFull,setEmployeeFull] =useState({});
    const [dataTypes,setDataTypes] = useState([]);
    let {emp_id} = useParams();

    useEffect(()=>{
        setIsLoading(true);

        const findEmployee = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getemployee/"+ emp_id, {
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(
                (res) => {
                    setEmployee(res.data.result[0]);
                }
            );
        };
        findEmployee();

        const findEmployeeFull = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getemployeeFull/" + emp_id, {
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(
                (res) => {
                    setEmployeeFull(res.data.result[0]);
                }
            );
        };
        findEmployeeFull();

        const findDataTypes = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getDataTypes",{
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(
                (res) => {
                    setDataTypes(res.data.result);
                }
            );
        };
        findDataTypes();

        setIsLoading(false);
    },[]);


    return(
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <>
                    <EditProfile empID= {emp_id} dataTypes = {dataTypes} employee={getEmployee} employeeFull={employeeFull}/>
                </>
            )}
        </div>
    );
};

export default EmployeeEdit;