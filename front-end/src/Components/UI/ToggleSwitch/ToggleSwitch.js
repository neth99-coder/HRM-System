import React, { useEffect } from "react";

import styled from './ToggleSwitch.module.css';

function ToggleSwitch(props){

  

   useEffect(()=>{
    document.getElementById(props.id).checked = props.label

    //console.log(props.id,props.label)
    },[props.id, props.label])
      
    

    return (
      <div className={`${styled["container"]} ${props.className}`}>
        <div className={styled["toggle-switch"]}>
          {/* This is the switch values */}
          <input type="checkbox" className={styled["checkbox"]}
                 name={props.label} id={props.id}  onClick= {()=>{props.handleToggle(props.id)}} />
          <label className={styled["label"]} htmlFor={props.id}>
            <span className={styled["inner"]} />
            <span className={styled["switch"]} />
          </label>
        </div>
      </div>
    );
  };
    
  export default ToggleSwitch;
