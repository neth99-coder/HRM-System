import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Redirect, BrowserRouter,
} from "react-router-dom";

// Route imports
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RequestPage from "../Pages/RequestPage/RequestPage";
import EmployeeSearch from "../Pages/EmployeeSearchPage/EmployeeSearchPage";
import EmployeeEdit from "../Pages/EmployeeEditPage/EmpoloyeeEditPage";
import EmployeeView from "../Pages/EmployeeViewPage/EmployeeViewPage";
import {EMPLOYEE} from "../shared/employee";
import {TYPE} from "../shared/employeeType";
import {DEPARTMENT} from "../shared/department";
import {EMPLOYEESTATUS} from "../shared/employeeStatus";
import {PAYGRADE} from "../shared/paygrade";
import Header from "../Components/Header/Header";
import NavBar from "../Components/Header/NavBarComponent/NavBarComponent";
import HeaderPage from "../Pages/HeaderPage";
import ProfileView from "../Pages/ProfileViewPage/ProfileViewPage";
import PageNotFound from "../Pages/PageNotFoundPage";


export default function AppRouter() {

  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };

  let type = 1; //todo: this should change according to the user

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route path="/" element={<HomePage/>} />

          {/*type1: Normal employee  employee/page_name*/}
          {/*type2: Supervisor       supervisor/page_name*/}
          {/*type3: HR manager       hrmanager/page_name*/}
          {/*type4: Admin            admin/page_name*/}
          {/*todo: conditions should change*/}

          {type === 1 ? (
              <Route exact path="employee" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={1}/> } >
                <Route path="requests" element={<RequestPage/>} />
                <Route path="my-profile" element={<ProfileView />} />
              </Route>
          ) : type === 2 ? (
              <Route exact path="supervisor" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={2}/> } >
                <Route path="requests" element={<RequestPage/>} />
                <Route path="my-profile" element={<ProfileView />} />
              </Route>
          ): type === 3 ? (
              <Route exact path="hrmanager" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={3}/> } >
                <Route path="requests" element={<RequestPage/>} />
                <Route exact path="employee" element={<EmployeeSearch employees={EMPLOYEE} type={TYPE} companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT}/>}/>
                <Route path="employee/view/:emp_id" element={<EmployeeView companyDetails={companyDetails} profileDetails={profileDetails} />} />
                <Route path="employee/edit/:emp_id" element={<EmployeeEdit companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT} type={TYPE} status={EMPLOYEESTATUS} paygrades={PAYGRADE} />} />
                <Route path="my-profile" element={<ProfileView />} />
              </Route>
          ):type === 4 ?(
              <Route exact path="employee" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={4}/> } >
                <Route path="home" element={<HomePage/>} />
              </Route>
          ):(
              <Route path="home" element={<HomePage/>} />
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}
