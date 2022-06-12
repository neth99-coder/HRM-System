import React, { useState } from "react";

import CompanyCard from "./CompanyCard/CompanyCard.js";
import ProfileCard from "./ProfileCard/ProfileCard.js";

import styles from "./Header.module.css";
import Dropdown from "../UI/Dropdown/Dropdown.js";
import Option from "../UI/Dropdown/Option.js";
import NavBar from "./NavBarComponent/NavBarComponent";

// icon imports
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import {Link} from "react-router-dom";

function Header(props) {
  const [dropdown, setDropdown] = useState("");

  const profileLink = () =>{
      if(props.type === 1){
          return(
              <Link to="/employee/my-profile"><Option className={styles['option__sec-child']} icon={<FiUser />} name="My Profile" /></Link>
          );
      }else if(props.type === 2) {
          return (
              <Link to="/supervisor/my-profile"><Option className={styles['option__sec-child']} icon={<FiUser/>}
                                                        name="My Profile"/></Link>
          );
      }if(props.type === 3) {
          return (
              <Link to="/hrmanager/my-profile"><Option className={styles['option__sec-child']} icon={<FiUser/>}
                                                       name="My Profile"/></Link>
          );
      }
  }

  const dropdownHandler = () => {
    if (dropdown === "") {
      setDropdown(
        <Dropdown className={styles["dropdown"]}>
          <div className={styles["profile-details"]}>
            <h2>{props.profileDetails.name}</h2>
            <h3>{props.profileDetails.post}</h3>
          </div>
          <Option className={styles['option__first-child']} icon={<FiSettings />} name="Settings" />
            {profileLink()}
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
