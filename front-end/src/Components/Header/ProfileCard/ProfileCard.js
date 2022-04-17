import React from "react";

import styles from "./ProfileCard.module.css";

function ProfileCard(props) {
  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-details"]}>
        <h2>{props.profileDetails.name}</h2>
        <h3>{props.profileDetails.post}</h3>
      </div>

      <div className={styles['profile-dp-container']}>
        <img
          className={styles["profile-dp"]}
          src={require(`../../../Images/${props.profileDetails.dp}`)}
          alt={props.profileDetails.name}
          onClick={props.dropdownHandler}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
