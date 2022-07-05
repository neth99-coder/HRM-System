import React from 'react';
import styled from "./index.module.css";
import { Card } from "react-bootstrap";

const ChartCard = (props) => {
    return (
        <Card className={styled["data-holder"]}>
        <div className={styled["legend-container"]}>
          <div
            className={`${styled["legend"]} ${styled["special-indicator"]}`}
          ></div>
          <h2>{props.title}</h2>
        </div>
        <h5>Available Days</h5>

        <div className={styled["info-container"]}>
          <div className={styled["availability"]}>
            <h6>
              <b>{props.allowed}</b>
            </h6>
            <p>allowed</p>
          </div>
          <div className={styled["availability"]}>
            <h6>
              <b>{props.taken}</b>
            </h6>
            <p>taken</p>
          </div>
          <div className={styled["availability"]}>
            <h6>
              <b>{props.remaining}</b>
            </h6>
            <p>remaining</p>
          </div>
        </div>
      </Card>
    );
};

export default ChartCard;