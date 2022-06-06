import React from "react";
import Header from "./Components/Header/Header.js";
import "./App.css";
import NavBar from "./Components/Header/NavBarComponent/NavBarComponent";
import Search from "./Components/EmployeeSearchComponent/SearchComponent/SearchComponent";
import {DEPARTMENT} from "./shared/department";
import EmployeeSearch from "./Components/EmployeeSearchComponent/EmployeeSearchComponent";
import {EMPLOYEE} from "./shared/employee";
import {TYPE} from "./shared/employeeType";
import EmployeeView from "./Components/EmployeeViewComponent/EmployeeViewComponent";

function App() {
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Poorna Jayakodi",
    post: "Admin",
  };

  return (
    <div>
      <EmployeeView companyDetails={companyDetails} profileDetails={profileDetails} />
      {/*<EmployeeSearch employees={EMPLOYEE} type={TYPE} companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT}/>*/}
    </div>
  );
}

export default App;