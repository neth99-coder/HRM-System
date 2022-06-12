import React from "react";
import { Card } from "react-bootstrap";
import { Chart } from "react-google-charts";

import styled from "./index.module.css";

import Header from "../../Components/Header/Header";

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

  const sickLeave = {
    taken: 7,
  };

  const holidays = {
    available: 19,
    planned: 10,
    taken: 4,
  };

  const special = {
    available: 14,
    planned: 1,
    taken: 0,
  };

  const homeOffice = {
    taken: 22,
  };

  // today total leave data
  const leave_data = [
    ["Leave Type", "Number of Leaves"],
    ["Sick Leave", 22],
    ["Holiday Leave", 12],
    ["Home-Working", 52],
    ["Working", 102],
  ];

  const work_home_data = [
    ["Working Type", "Number"],
    ["Home-Working", 52],
    ["Physical-Working", 102]
  ]

  return (
    <div className={styled["page-holder"]}>
      <Header
        profileDetails={profileDetails}
        companyDetails={companyDetails}
        className={styled["header"]}
      />

      <section className={styled["data-container"]}>
        <div className={styled["cards"]}>
          <Card className={styled["data-holder"]}>
            <div className={styled["legend-container"]}>
              <div
                className={`${styled["legend"]} ${styled["sick-indicator"]}`}
              ></div>
              <h2>Sick Leave</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled["info-container"]}>
              <div className={styled["availability"]}>
                <h6>
                  <b>Unlimited</b>
                </h6>
                <p>available</p>
              </div>
              <div className={styled["availability"]} hidden>
                <h6>
                  <b></b>
                </h6>
                <p></p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{sickLeave.taken}</b>
                </h6>
                <p>taken</p>
              </div>
            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled["legend-container"]}>
              <div
                className={`${styled["legend"]} ${styled["holiday-indicator"]}`}
              ></div>
              <h2>Holidays</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled["info-container"]}>
              <div className={styled["availability"]}>
                <h6>
                  <b>{holidays.available}</b>
                </h6>
                <p>available</p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{holidays.planned}</b>
                </h6>
                <p>planned</p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{sickLeave.taken}</b>
                </h6>
                <p>taken</p>
              </div>
            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled["legend-container"]}>
              <div
                className={`${styled["legend"]} ${styled["special-indicator"]}`}
              ></div>
              <h2>Special</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled["info-container"]}>
              <div className={styled["availability"]}>
                <h6>
                  <b>{special.available}</b>
                </h6>
                <p>available</p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{special.planned}</b>
                </h6>
                <p>planned</p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{sickLeave.taken}</b>
                </h6>
                <p>taken</p>
              </div>
            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled["legend-container"]}>
              <div
                className={`${styled["legend"]} ${styled["home-office-indicator"]}`}
              ></div>
              <h2>Home Office</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled["info-container"]}>
              <div className={styled["availability"]}>
                <h6>
                  <b>Unlimited</b>
                </h6>
                <p>available</p>
              </div>
              <div className={styled["availability"]} hidden>
                <h6>
                  <b></b>
                </h6>
                <p></p>
              </div>
              <div className={styled["availability"]}>
                <h6>
                  <b>{homeOffice.taken}</b>
                </h6>
                <p>taken</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className={styled["overall-static-section"]}>
        <section className={styled["graph-view"]}>
          <div className={styled["stat-graph"]}>
            {/* This is the pie chart for overall leaves */}
            <Chart
              chartType="PieChart"
              data={leave_data}
              options={{
                title: "Today Leaves",
                pieSliceTextStyle: {fontSize: 15},
                colors: ["orange", "green", "#e32424", "black"],
                legend: { position: "right", textStyle: { fontSize: 12 }},
                tooltip: { trigger: "none" },
                chartArea: {left: 25, width: "100%"}
              }}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className={styled["stat-graph"]}>
          <Chart
              chartType="PieChart"
              data={work_home_data}
              options={{
                title: "Work From Home",
                pieSliceTextStyle: {fontSize: 20},
                colors: ["black", "#e32424"],
                legend: { position: "right", textStyle: { fontSize: 12 }},
                tooltip: { trigger: "none" },
                chartArea: {left: 10, width: "100%"}
              }}
              width={"100%"}
              height={"100%"}
            />
          </div>
        </section>

        <section className={styled["absance-stats"]}>
          <div className={styled["today"]}>Hello</div>
          <div className={styled["tomorrow"]}></div>
        </section>
      </section>
    </div>
  );
}

export default HomePage;
