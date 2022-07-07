import React from "react";
import { Spinner } from "react-bootstrap";


import styled from "./index.module.css";

import Header from "../../Components/Header/Header";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import ChartCard from "./ChartCard";
import authService from "../../services/auth.service"

function EmployeeHomePage() {


  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(false) 


  useEffect(() => {
    const loadLeaves = async () => {
      setIsLoading(true)
      await Axios.get(
        "http://localhost:3001/api/employee/leaveChart/"+  authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        console.log(res.data.result);
        setLeaveData([...res.data.result]);
        setIsLoading(false);
      });
    };
    loadLeaves();


  }, []);

 
  return (
    <>
          {isLoading ? (
        <Spinner animation="border" role="status" className={styled['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
    <div className={styled["page-holder"]}>
      {/* <Header
        profileDetails={profileDetails}
        companyDetails={companyDetails}
        className={styled["header"]}
      /> */}

      <section className={styled["data-container"]}>
        <div className={styled["cards"]}>
          {leaveData?.map((cur, index) => {
            return (
              <ChartCard
                key={index}
                allowed={cur.allowed}
                taken={cur.taken}
                remaining={cur.remaining}
                title={cur.title}
              />
            );
          })}
        </div>
      </section>

    </div>)}
    </>
  );
}

export default EmployeeHomePage;
