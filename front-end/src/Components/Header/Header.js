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

import authService from "../../services/auth.service.js";


function Header(props) {
  const [dropdown, setDropdown] = useState("");
  var empType = 'Default' ;
    switch (authService.getUserType()){
      
      case 1:
        
        empType =  "Employee";
        break;

      case 2:
        
        empType =  "Supervisor";
        break;

      case 3:
        
        empType = "HR Manager";
        break;

      case 4:
        empType = "Admin";
        break;

      default:
        break;
    }
  

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
          {/* <div className={styles["profile-details"]}>
            <h2>{empName}</h2>
            <h3>{empType}</h3>
          </div> */}
          <Option className={styles['option__first-child']} icon={<FiSettings />} name="Settings" />
            {profileLink()}
          <Option icon={<FiLogOut />} name="Logout" handleClick={handleLogout}/>
        </Dropdown>
      );
    } else {
      setDropdown("");
    }
  };

  function handleLogout(e){
    authService.logout();
    window.location.href = "/";
  }
  return (
    <div>
      <header className={`${styles["header"]} ${props.className}`}>
        <CompanyCard companyDetails={props.companyDetails} />
        <ProfileCard
    
          dropdownHandler={dropdownHandler}
        />
      </header>
      {dropdown}
    </div>
  );
}

export default Header;
