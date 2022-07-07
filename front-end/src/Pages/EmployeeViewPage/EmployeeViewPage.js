import React from "react";
import { useEffect } from "react";
import ProfileView from "./ProfileViewComponent/ProfileViewComponent";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "../RequestPage/RequestPage.module.css";
import authService from "../../services/auth.service";

/*
todo: add a field to store employee's profile picture
 */
function EmployeeView(props){

    const [isLoading, setIsLoading] = useState(true);
    const [getEmployee,setEmployee] = useState({});
    const [employeeFull,setEmployeeFull] =useState({});
    const [supervisor,setSupervisor] = useState();

  let { emp_id } = useParams();
  if (emp_id === null) {
    emp_id = props.emp_id;
  }

  useEffect(() => {
    setIsLoading(true);

    const findEmployee = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrmanager/getemployee/" + emp_id,
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        setEmployee(res.data.result[0]);
      });
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
                <ProfileView employee={getEmployee} employeeFull={employeeFull} supervisor={supervisor}/>
                )}
        </div>
    );
}

export default EmployeeView;
