import React, { useEffect, useState } from "react";

import styles from "./ProfileCard.module.css";
import Axios from 'axios';
import authService from "../../../services/auth.service";

function ProfileCard(props) {

  const [userName,setUserName] = useState('');
  const [userPost, setUserPost] = useState('');
  const [dp, setDp] = useState("default.jpg")


  useEffect(()=>{
    const loadProfileData = async () => {
      await Axios.get(
        "http://localhost:3001/api/employee/getemployee/"+ authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        
       console.log(res.data.result[0]['prfile_picture']);
       setUserName(res.data.result[0]['first_name'] + " " + res.data.result[0]['last_name']);
       setUserPost(res.data.result[0]['job_type_title']);
       setDp(res.data.result[0]['profile_picture']);
        
      });
    };
    loadProfileData();
  })




  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-details"]}>
        <h2>{userName}</h2>
        <h3>{userPost}</h3>
      </div>

      <div className={styles['profile-dp-container']}>
        <img
          className={styles["profile-dp"]}
          src={`http://localhost:3001/profilePictures/${dp}`}
          alt={userName}
          onClick={props.dropdownHandler}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
