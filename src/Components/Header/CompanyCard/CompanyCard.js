import React from "react";

import styles from "./CompanyCard.module.css";

function CompanyCard(props) {
  return (
    <div className={styles["company-card"]}>
      <img
        className={styles["company-logo"]}
        src={require(`../../../Images/${props.companyDetails.logo}`)}
        alt={`${props.companyDetails.name} logo`}
      />

      <div className={styles["company-details"]}>
        <h2>{props.companyDetails.name}</h2>
        <h3>{props.companyDetails.addressLine1}</h3>
        <h3>{props.companyDetails.addressLine2}</h3>
      </div>
    </div>
  );
}

export default CompanyCard;
