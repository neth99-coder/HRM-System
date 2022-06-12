import { React, useState, useEffect } from "react";
import styles from "./RequestCard.module.css";

const RequestCard = (props) => {
  const [status, setStatus] = useState("Pending");
  const [bgColor, setBgColor] = useState("#FFD54F");

  useEffect(() => {
    if (props.state_id === 1) {
      setBgColor("#00E676");
      setStatus("Approved");
    } else if (props.state_id === 2) {
      setBgColor("#E64A19");
      setStatus("Rejected");
    } else if (props.state_id === 3) {
      setBgColor("#FFD54F");
      setStatus("Pending");
    }
  }, [props.state_id]);

  return (
    <div className={`${styles["card"]} border border-3 align-self-center`}>
      <div className={`${styles["first-row"]} row`}>
        <div className="col align-self-start text-center ">
          <strong className="h3">{props.leave_begin}</strong>
        </div>
        <div className="col align-self-end text-center"></div>
      </div>
      <div className={`${styles["first-row"]} row`}>
        <div className="col align-self-start text-center text-muted">
          {props.type}
        </div>
        <div className="col align-self-end text-center">
          <mark style={{ backgroundColor: bgColor, opacity: "0.8" }}>
            {status}
          </mark>
        </div>
      </div>
      <div className={`${styles["first-row"]} row`}>
        <div className="col align-self-start text-center">{props.reason}</div>
        <div className="col align-self-end text-center"> </div>
      </div>
    </div>
  );
};

export default RequestCard;
