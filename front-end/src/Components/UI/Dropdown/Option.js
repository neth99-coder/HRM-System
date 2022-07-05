import React from "react";

import styles from "./Option.module.css";

function Option(props) {



  return (
    <div className={`${styles['option']} ${props.className}`}>
      {props.icon}
      <label onClick={()=>{props.handleClick()}}>{props.name}</label>
    </div>
  );
}

export default Option;
