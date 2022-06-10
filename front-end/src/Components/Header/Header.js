import React, { useState } from "react";

import CompanyCard from "./CompanyCard/CompanyCard.js";
import ProfileCard from "./ProfileCard/ProfileCard.js";

import styles from "./Header.module.css";
import Dropdown from "../UI/Dropdown/Dropdown.js";
import Option from "../UI/Dropdown/Option.js";

// icon imports
import { FiLogOut, FiSettings } from "react-icons/fi";

function Header(props) {
  const [dropdown, setDropdown] = useState("");

  const dropdownHandler = () => {
    if (dropdown === "") {
      setDropdown(
        <Dropdown className={styles["dropdown"]}>
          <div className={styles["profile-details"]}>
            <h2>{props.profileDetails.name}</h2>
            <h3>{props.profileDetails.post}</h3>
          </div>
          <Option className={styles['option__first-child']} icon={<FiSettings />} name="Settings" />
          <Option icon={<FiLogOut />} name="Logout" />
        </Dropdown>
      );
    } else {
      setDropdown("");
    }
  };

  return (
    <div>
      <header className={styles["header"]}>
        <CompanyCard companyDetails={props.companyDetails} />
        <ProfileCard
          profileDetails={props.profileDetails}
          dropdownHandler={dropdownHandler}
        />
      </header>
      {dropdown}
    </div>
  );
}

export default Header;
