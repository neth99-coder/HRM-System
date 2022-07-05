import React from "react";

import styled from './ToggleSwitch.module.css';

function ToggleSwitch(props){
    return (
      <div className={`${styled["container"]} ${props.className}`}>
        <div className={styled["toggle-switch"]}>
          {/* This is the switch values */}
          <input type="checkbox" className={styled["checkbox"]}
                 name={props.label} id={props.id} />
          <label className={styled["label"]} htmlFor={props.id}>
            <span className={styled["inner"]} />
            <span className={styled["switch"]} />
          </label>
        </div>
      </div>
    );
  };
    
  export default ToggleSwitch;
