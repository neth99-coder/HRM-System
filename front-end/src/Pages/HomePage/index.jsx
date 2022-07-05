import React from "react";
//import { Card } from "react-bootstrap";
import { Chart } from "react-google-charts";

import styled from "./index.module.css";

import Header from "../../Components/Header/Header";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import ChartCard from "./ChartCard";
import authService from "../../services/auth.service"

function HomePage() {
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
  const [leavePieChart, setLeavePieChart] = useState([]);
  const [workingPieChart, setworkingPieChart] = useState([]);
  const [absentToday, setAbsentToday] = useState([]);
  const [absentTomorrow, setAbsentTomorrow] = useState([]);

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

    const loadLeavePieChart = async () => {
      await Axios.get(
        "http://localhost:3001/api/supervisor/getLeaveTypesCount",
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        //console.log(res.data.result);
        setLeavePieChart([...res.data.result]);
      });
    };
    loadLeavePieChart();

    const loadWorkingPieChart = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getWorkingToday",
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        //console.log(res.data.result);
        setworkingPieChart(res.data.result)
      });
    };
    loadWorkingPieChart();

    const loadAbsentToday = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getAbsentToday",
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
       // console.log(res.data.result);
        setAbsentToday(res.data.result)
      });
    };
    loadAbsentToday();

    const loadAbsentTomorrow = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getAbsentTomorrow",
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        //console.log(res.data.result);
        setAbsentTomorrow(res.data.result)
      });
    };
    loadAbsentTomorrow();


  }, []);

 
  return (
    <div className={styled["page-holder"]}>
      <Header
        profileDetails={profileDetails}
        companyDetails={companyDetails}
        className={styled["header"]}
      />

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

      <section className={styled["overall-static-section"]}>
        <div className={styled["stat-graph"]}>
          {/* This is the pie chart for overall leaves */}
          <Chart
            chartType="PieChart"
            data={leavePieChart}
            options={{
              title: "Today Leaves",
              pieSliceTextStyle: { fontSize: 15 },
              colors: ["green", "#e32424", "black"],
              legend: { position: "right", textStyle: { fontSize: 12 } },
              tooltip: { trigger: "none" },
              chartArea: { left: 25, width: "100%" },
            }}
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className={styled["stat-graph"]}>
          <Chart
            chartType="PieChart"
            data={workingPieChart}
            options={{
              title: "Working Today",
              pieSliceTextStyle: { fontSize: 20 },
              colors: ["black", "#e32424","green","blue"],
              legend: { position: "right", textStyle: { fontSize: 12 } },
              tooltip: { trigger: "none" },
              chartArea: { left: 10, width: "100%" },
            }}
            width={"100%"}
            height={"100%"}
          />
        </div>

        <div className={styled["absance-stats"]}>
          <h3>Who's Away</h3>
          <div className={styled["date-stat"]}>
            <h5>
              <b>Today</b>
            </h5>
            <div className={styled["avatar-container"]}>
              {absentToday.map((profile) => (
                <div key={profile.emp_id} className={styled["avatar"]}>
                  <img
                    className={styled["avatar-img"]}
                    src={(profile.profile_picture)?(`../../assets/profile_picture/${profile.profile_picture}`):(`../../assets/profile_picture/default.jpg`)}
                    alt={profile.emp_id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styled["date-stat"]}>
            <h5>
              <b>Tomorrow</b>
            </h5>
            <div className={styled["avatar-container"]}>
              {absentTomorrow.map((profile, index) => {
                if (index > 10) {
                  return <></>;
                }

                return (
                  <div key={profile.emp_id} className={styled["avatar"]}>
                    <img
                      className={styled["avatar-img"]}
                      src={(profile.profile_picture !== '')?(`../../assets/profile_picture/${profile.profile_picture}`):(`../../assets/profile_picture/default.jpg`)}
                      alt={profile["emp_id"]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
