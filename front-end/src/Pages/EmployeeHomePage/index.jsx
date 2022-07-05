import React from "react";
//import { Card } from "react-bootstrap";


import styled from "./index.module.css";

import Header from "../../Components/Header/Header";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import ChartCard from "./ChartCard";
import authService from "../../services/auth.service"

function EmployeeHomePage() {
  // Need to import these details from the server
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  // Current User leave data
  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };


  const [leaveData, setLeaveData] = useState([]);



  useEffect(() => {
    const loadLeaves = async () => {
      await Axios.get(
        "http://localhost:3001/api/employee/leaveChart/"+  authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        console.log(res.data.result);
        setLeaveData([...res.data.result]);
      });
    };
    loadLeaves();


  }, []);

 
  return (
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

    </div>
  );
}

export default EmployeeHomePage;
