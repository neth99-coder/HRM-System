import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate, BrowserRouter,
} from "react-router-dom";

// Route imports
import LoginPage from "../Pages/LoginPage";
import RequestPage from "../Pages/RequestPage/RequestPage";
import EmployeeSearch from "../Pages/EmployeeSearchPage/EmployeeSearchPage";
import EmployeeEdit from "../Pages/EmployeeEditPage/EmpoloyeeEditPage";
import EmployeeView from "../Pages/EmployeeViewPage/EmployeeViewPage";
import HRManagerView from "../Pages/AdminHomePage/HRManagerViewComponent/ProfileViewComponent/ProfileViewComponent";
import HRManagerEdit from "../Pages/AdminHomePage/HRManagerEditComponent/EmpoloyeeEditPage";
import EmployeeProfileView from "../Pages/AdminHomePage/EmployeeViewComponent/ProfileViewPage"
import {EMPLOYEE} from "../shared/employee";
import {TYPE} from "../shared/employeeType";
import {DEPARTMENT} from "../shared/department";
import {EMPLOYEESTATUS} from "../shared/employeeStatus";
import {PAYGRADE} from "../shared/paygrade";
import HeaderPage from "../Pages/HeaderPage";
import ProfileView from "../Pages/ProfileViewPage/ProfileViewPage";
import AddNewEmployeePage from "../Pages/AddNewEmployeePage/AddNewEmployeePage";
import HandleLeavePage from "../Pages/HandleLeavePage";
import EmployeeHomePage from "../Pages/EmployeeHomePage";
import HrManagerHomePage from "../Pages/HrManagerHomePage"
import Unauth from "../Pages/ErrorPages/Unauth";
import NotFound from "../Pages/ErrorPages/NotFound";
import AdminHomePage from "../Pages/AdminHomePage/index"
import HRManagerView from "../Pages/AdminHomePage/HRManagerViewComponent/ProfileViewComponent/ProfileViewComponent";
import HRManagerEdit from "../Pages/AdminHomePage/HRManagerEditComponent/EmpoloyeeEditPage";
import EmployeeProfileView from "../Pages/AdminHomePage/EmployeeViewComponent/ProfileViewPage";


import authService from "../services/auth.service"

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

  let type = authService.getUserType(); //todo: this should change according to the user


//console.log(type+"AAAA");



  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* <Route exact path="/login" element={<LoginPage/>} /> */}
          <Route path="/" element={<LoginPage/>} />

          {/*type1: Normal employee  employee/page_name*/}
          {/*type2: Supervisor       supervisor/page_name*/}
          {/*type3: HR manager       hrmanager/page_name*/}
          {/*type4: Admin            admin/page_name*/}
          {/*todo: conditions should change*/}

          {type === 1 ? (
            <Route >
                <Route exact path="employee" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={1}/> } >
                <Route path="" element={<EmployeeHomePage/>} />
                <Route path="requests" element={<RequestPage/>} />
                <Route path="my-profile" element={<ProfileView />} />
                <Route path="*" element={<NotFound/>} />
            </Route>
            <Route path="*" element={<Unauth/>} />
              </Route>
          ) : type === 2 ? (
            <Route>
              <Route exact path="supervisor" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={2}/> } >
                <Route path="" element={<EmployeeHomePage/>} />
                <Route path="requests" element={<RequestPage/>} />
                <Route path="my-profile" element={<ProfileView />} />
                <Route path="handle-leaves" element={<HandleLeavePage/>}/>
                <Route path="*" element={<NotFound/>} />
              </Route>
              <Route path="*" element={<Unauth/>} />
            </Route>

          ): type === 3 ? (  
            <Route >
              <Route exact path="hrmanager" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={3}/> } >
                <Route path="" element={<HrManagerHomePage/>} />
                <Route path="requests" element={<RequestPage/>} />
                <Route exact path="employee" element={<EmployeeSearch employees={EMPLOYEE} type={TYPE} companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT}/>}/>
                <Route path="employee/view/:emp_id" element={<EmployeeView companyDetails={companyDetails} profileDetails={profileDetails} />} />
                <Route path="employee/edit/:emp_id" element={<EmployeeEdit companyDetails={companyDetails} profileDetails={profileDetails} departments={DEPARTMENT} type={TYPE} status={EMPLOYEESTATUS} paygrades={PAYGRADE} />} />
                <Route path="employee/add-new" element={<AddNewEmployeePage />} />
                <Route path="my-profile" element={<ProfileView />} />
                <Route path="*" element={<NotFound/>} />
              </Route>
              <Route path="*" element={<Unauth/>} />
            </Route>
          ):type === 4 ?(
             <Route>
              <Route exact path="admin" element={<HeaderPage companyDetails={companyDetails} profileDetails={profileDetails} type={4}/> } >
                <Route path="" element={<AdminHomePage departments={DEPARTMENT} type={TYPE} status={EMPLOYEESTATUS} paygrades={PAYGRADE}/>} />
                <Route path="emp-profile" element={<EmployeeProfileView />} />
                <Route path="hr-profile" element={<HRManagerView />} />
                <Route path="hr-profile/edit" element={<HRManagerEdit departments={DEPARTMENT} type={TYPE} status={EMPLOYEESTATUS} paygrades={PAYGRADE}/>} />
                <Route path="*" element={<NotFound/>} />
              </Route>
              <Route path="*" element={<Unauth/>} />
            </Route>

          ):type === null?(
            <Route path="*" element={<Unauth/>} />
          ):(
            <Route path="/" element={<LoginPage/>} />
          )}
          
        </Routes>
      </>
    </BrowserRouter>
  );
}
