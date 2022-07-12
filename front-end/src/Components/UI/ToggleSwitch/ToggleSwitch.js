import React, { useEffect } from "react";

import styled from './ToggleSwitch.module.css';

function ToggleSwitch(props){

  

   useEffect(()=>{
    document.getElementById(props.id).checked = props.label

    // console.log(props.id,props.label)
    },[props.id, props.label])
      
    

    return (
      <div >
        <div >
          {/* This is the switch values */}
          <input type="checkbox" 
                 name={props.label} id={props.id}  onClick= {()=>{props.handleToggle(props.id)}} />
          <label  htmlFor={props.id}>
            <span  />
            <span  />
          </label>
        </div>
      </div>
    );
  };
    
  export default ToggleSwitch;
