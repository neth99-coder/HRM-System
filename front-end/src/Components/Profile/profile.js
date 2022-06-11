import React from 'react';
import  styles from "./profle.module.css";
import profile from "../../Images/profile.png";

function Profile() {
    return ( 
        <div className={`${styles["profile-wrapper"]}`}>
            <div className={`${styles["top-div"]}`}></div>
            <img className={`${styles["profile-image"]}`} src = {profile}></img>
            <h1 className={`${styles["fullname"]}`}>Jane Smith</h1>
            <h3 className={`${styles["job"]}`}>Software Engineer</h3>
        </div>
     );
}

export default Profile;