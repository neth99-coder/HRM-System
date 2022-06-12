import React, { useState } from "react";
import { Card, Carousel } from "react-bootstrap";

import styled from "./index.module.css";

import Header from "../../Components/Header/Header";
import { propTypes } from "react-bootstrap/esm/Image";

function HomePage() {
  // Need to import these details from the server
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };

  const sickLeave = {
    taken: 7
  }

  const holidays = {
    available: 19,
    planned: 10,
    taken: 4
  }

  const special = {
    available: 14,
    planned: 1,
    taken: 0
  }

  const homeOffice = {
    taken: 22,
  }

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
            <div className={styled['legend-container']}>
              <div className={`${styled['legend']} ${styled['sick-indicator']}`}></div>
              <h2>Sick Leave</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled['info-container']}>
              <div className={styled['availability']}>
                <h6><b>Unlimited</b></h6>
                <p>available</p>
              </div>
              <div className={styled['availability']} hidden>
                <h6><b></b></h6>
                <p></p>
              </div>
              <div className={styled['availability']}>
                <h6><b>{sickLeave.taken}</b></h6>
                <p>taken</p>
              </div>

            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled['legend-container']}>
              <div className={`${styled['legend']} ${styled['holiday-indicator']}`}></div>
              <h2>Holidays</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled['info-container']}>
              <div className={styled['availability']}>
                <h6><b>{holidays.available}</b></h6>
                <p>available</p>
              </div>
              <div className={styled['availability']} >
                <h6><b>{holidays.planned}</b></h6>
                <p>planned</p>
              </div>
              <div className={styled['availability']}>
                <h6><b>{sickLeave.taken}</b></h6>
                <p>taken</p>
              </div>

            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled['legend-container']}>
              <div className={`${styled['legend']} ${styled['special-indicator']}`}></div>
              <h2>Special</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled['info-container']}>
              <div className={styled['availability']}>
                <h6><b>{special.available}</b></h6>
                <p>available</p>
              </div>
              <div className={styled['availability']} >
                <h6><b>{special.planned}</b></h6>
                <p>planned</p>
              </div>
              <div className={styled['availability']}>
                <h6><b>{sickLeave.taken}</b></h6>
                <p>taken</p>
              </div>

            </div>
          </Card>

          <Card className={styled["data-holder"]}>
            <div className={styled['legend-container']}>
              <div className={`${styled['legend']} ${styled['home-office-indicator']}`}></div>
              <h2>Home Office</h2>
            </div>
            <h5>Available Days</h5>

            <div className={styled['info-container']}>
              <div className={styled['availability']}>
                <h6><b>Unlimited</b></h6>
                <p>available</p>
              </div>
              <div className={styled['availability']} hidden>
                <h6><b></b></h6>
                <p></p>
              </div>
              <div className={styled['availability']}>
                <h6><b>{homeOffice.taken}</b></h6>
                <p>taken</p>
              </div>

            </div>
          </Card>


          
        </div>
      </section>
    </div>
  );
}

export default HomePage;
