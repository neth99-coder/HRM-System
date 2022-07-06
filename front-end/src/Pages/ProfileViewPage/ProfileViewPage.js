import React from "react";
import Profile from "./ProfileComponent/ProfileComponent";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Spinner } from "react-bootstrap";
import styles from "../EmployeeViewPage/ProfileViewComponent/ProfileViewComponent.module.css";
import authService from "../../services/auth.service";

function ProfileView(props){

    let emp_id = authService.getUserID();
    const [isLoading, setIsLoading] = useState(true);
    const [getEmployee,setEmployee] = useState({});
    const [employeeFull,setEmployeeFull] =useState({});
    const [supervisor,setSupervisor] = useState();

  useEffect(() => {
    setIsLoading(true);

        const findEmployee = async () => {
            await Axios.get("http://localhost:3001/api/employee/getemployee/"+ emp_id,
                {
                    headers: { "x-auth-token": authService.getUserToken() },
                }).then(
                (res) => {
                    setEmployee(res.data.result[0]);
                }
            );
        };
        findEmployee();

        const findEmployeeFull = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getemployeeFull/" + emp_id,
                {
                    headers: { "x-auth-token": authService.getUserToken() },
                }).then(
                (res) => {
                    setEmployeeFull(res.data.result[0]);
                }
            );
        };
        findEmployeeFull();

      const findSupervisor = async () => {
          await Axios.get("http://localhost:3001/api/hrManager/getSupervisorByEmpId/" + emp_id, {
              headers: { "x-auth-token": authService.getUserToken() },
          }).then((res) => {
              setSupervisor(res.data.result[0].supervisor_id + " - " + res.data.result[0].first_name + " " + res.data.result[0].last_name);
          });
      };

      findSupervisor();

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
                    <Profile employee={getEmployee} employeeFull={employeeFull} supervisor={supervisor}/>
                </>
                )};
        </div>
    );
}

export default ProfileView;
