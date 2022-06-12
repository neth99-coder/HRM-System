import React from "react";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Header from "./Components/Header/Header.js";
import "./App.css";
import NavBar from "./Components/Header/NavBarComponent/NavBarComponent";
import Search from "./Components/EmployeeSearchComponent/SearchComponent/SearchComponent";
import {DEPARTMENT} from "./shared/department";
import EmployeeSearch from "./Components/EmployeeSearchComponent/EmployeeSearchComponent";
import {EMPLOYEE} from "./shared/employee";
import {TYPE} from "./shared/employeeType";
import EmployeeView from "./Components/EmployeeViewComponent/EmployeeViewComponent";
import EmployeeEdit from "./Components/EmployeeEditComponent/EmpoloyeeEditComponent";
import {EMPLOYEESTATUS} from "./shared/employeeStatus";
import {PAYGRADE} from "./shared/paygrade";

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
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header companyDetails={companyDetails} profileDetails={profileDetails}/>}/>
        <Route exact path="/employee" element={<EmployeeSearch employees={EMPLOYEE} type={TYPE} companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT}/>}/>
        <Route path="/employee/view/:emp_id" element={<EmployeeView companyDetails={companyDetails} profileDetails={profileDetails} />} />
        <Route path="/employee/edit/:emp_id" element={<EmployeeEdit companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT} type={TYPE} status={EMPLOYEESTATUS} paygrades={PAYGRADE} />} />
      </Routes>
    </BrowserRouter>

     // {/**/}

  );
}

export default App;