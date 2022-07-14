import React from 'react';
import  styles from "./profle.module.css";

function Profile(props) {
    return ( 
        <div className={`${styles["profile-wrapper"]}`}>
            <div className={`${styles["top-div"]}`}></div>
            <img className={`${styles["profile-image"]}`} src = {`http://localhost:3001/profilePictures/${props.img ? props.img : 'default.jpg'}`}></img>
            <h1 className={`${styles["fullname"]}`}>{props.name}</h1>
            <h3 className={`${styles["job"]}`}>{props.jobRole}</h3>
        </div>
     );
}

export default Profile;