import React, {useEffect, useState} from "react";
import EditProfile from "./EditProfileComponent/EditProfileComponent";
import {useParams} from "react-router-dom";
import Axios from "axios";
import styles from "../RequestPage/RequestPage.module.css";
import {Spinner} from "react-bootstrap";

function EmployeeEdit(props){

    let {emp_id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [getEmployee,setEmployee] = useState({});
    const [getDepartments,setDepartments] = useState([]);
    const [getTypes,setTypes] = useState([]);
    const [getStatus,setStatus] = useState([]);
    const [getPaygrades,setPaygrades] = useState([]);

    useEffect(()=>{
        setIsLoading(true);

        const findEmployee = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getemployee/"+ emp_id).then(
                (res) => {
                    setEmployee(res.data.result[0]);
                }
            );
        };
        findEmployee();
        setIsLoading(false);
    },[]);

    // useEffect(()=>{
    //     setIsLoading(true);
    //
    //     const findEmployee = async () => {
    //         await Axios.get("http://localhost:3001/api/hrmanager/getemployee/"+ emp_id).then(
    //             (res) => {
    //                 console.log(res.data.result[0])
    //                 setEmployee(res.data.result[0]);
    //             }
    //         );
    //     };
    //     findEmployee();
    //
    //     const findDepartments = async () => {
    //         await Axios.get("http://localhost:3001/api/hrmanager/getDepartments").then(
    //             (res) => {
    //                 setDepartments(res.data.result);
    //             }
    //         );
    //     };
    //     findDepartments();
    //
    //     const findTypes = async () => {
    //         await Axios.get("http://localhost:3001/api/hrmanager/getTypes").then(
    //             (res) => {
    //                 setTypes(res.data.result);
    //             }
    //         );
    //     };
    //     findTypes();
    //
    //     const findStatus = async () => {
    //         await Axios.get("http://localhost:3001/api/hrmanager/getStatus").then(
    //             (res) => {
    //                 setStatus(res.data.result);
    //             }
    //         );
    //     };
    //     findStatus();
    //
    //     const findPaygrades = async () => {
    //         await Axios.get("http://localhost:3001/api/hrmanager/getPaygrades").then(
    //             (res) => {
    //                 setPaygrades(res.data.result);
    //             }
    //         );
    //     };
    //     findPaygrades();
    //
    // },[]);

    return(
        <div>
            {/*{isLoading ? (*/}
            {/*    <Spinner animation="border" role="status" className={styles['spinner']}>*/}
            {/*        <span className="visually-hidden">Loading...</span>*/}
            {/*    </Spinner>*/}
            {/*):(*/}
                <>
                    <EditProfile empID= {emp_id} employee={getEmployee} departments={getDepartments} type={getTypes} status={getStatus} paygrades={getPaygrades}/>
                </>
             {/*)}*/}
        </div>
    );
};

export default EmployeeEdit;