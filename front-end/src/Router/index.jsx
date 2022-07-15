import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

// Route imports
import LoginPage from "../Pages/LoginPage";
import RequestPage from "../Pages/RequestPage/RequestPage";
import AttendancePage from "../Pages/AttendancePage";
import LeaveConfigPage from "../Pages/LeaveConfigPage";
import EmployeeSearch from "../Pages/EmployeeSearchPage/EmployeeSearchPage";
import EmployeeEdit from "../Pages/EmployeeEditPage/EmpoloyeeEditPage";
import EmployeeView from "../Pages/EmployeeViewPage/EmployeeViewPage";
import HRManagerView from "../Pages/AdminHomePage/HRManagerViewComponent/ProfileViewComponent/ProfileViewComponent";
import HRManagerEdit from "../Pages/AdminHomePage/HRManagerEditComponent/EmpoloyeeEditPage";
import EmployeeProfileView from "../Pages/AdminHomePage/EmployeeViewComponent/ProfileViewPage"
import HeaderPage from "../Pages/HeaderPage";
import ProfileView from "../Pages/ProfileViewPage/ProfileViewPage";
import AddNewEmployeePage from "../Pages/AddNewEmployeePage/AddNewEmployeePage";
import HandleLeavePage from "../Pages/HandleLeavePage";
import EmployeeHomePage from "../Pages/EmployeeHomePage";
import HrManagerHomePage from "../Pages/HrManagerHomePage"
import Unauth from "../Pages/ErrorPages/Unauth";
import NotFound from "../Pages/ErrorPages/NotFound";
import AdminHomePage from "../Pages/AdminHomePage/index";
import CompanyDetailsPage from "../Pages/CompanyDetailsPage/CompanyDetailsPage";
import Reports from "../Pages/ReportsPage";


import authService from "../services/auth.service"


export default function AppRouter() {

  const companyDetails = {
    logo: "logo.png",

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
                <Route exact path="employee" element={<HeaderPage companyDetails={companyDetails}  type={1}/> } >
                <Route path="" element={<EmployeeHomePage/>} />
                <Route path="requests" element={<RequestPage/>} />
                <Route path="my-profile" element={<ProfileView />} />
                <Route path="*" element={<NotFound/>} />
            </Route>
            <Route path="*" element={<Unauth/>} />
              </Route>
          ) : type === 2 ? (
            <Route>
              <Route exact path="supervisor" element={<HeaderPage  companyDetails={companyDetails}  type={2}/> } >
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
              <Route exact path="hrmanager" element={<HeaderPage  companyDetails={companyDetails}  type={3}/> } >
                <Route path="" element={<HrManagerHomePage/>} />
                <Route exact path="employee" element={<EmployeeSearch companyDetails={companyDetails} />}/>
                <Route exact path="reports" element={<Reports companyDetails={companyDetails} />}/>
                <Route path="employee/view/:emp_id" element={<EmployeeView companyDetails={companyDetails}  />} />
                <Route path="employee/edit/:emp_id" element={<EmployeeEdit companyDetails={companyDetails}  />} />
                <Route path="employee/add-new" element={<AddNewEmployeePage />} />
                <Route path="my-profile" element={<ProfileView />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="leave-config" element={<LeaveConfigPage />} />
                <Route path="handle-leaves" element={<HandleLeavePage/>}/>

                <Route path="*" element={<NotFound/>} />
              </Route>
              <Route path="*" element={<Unauth/>} />
            </Route>
          ):type === 4 ?(
             <Route>
              <Route exact path="admin" element={<HeaderPage companyDetails={companyDetails}  type={4}/> } >
                <Route path="" element={<AdminHomePage companyDetails={companyDetails} />} />
                <Route path="emp-profile" element={<EmployeeProfileView />} />
                <Route path="hr-profile" element={<HRManagerView />} />
                <Route path="hr-profile/edit/:emp_id" element={<HRManagerEdit />} />
                <Route path="companyDetails" element={<CompanyDetailsPage companyDetails={companyDetails}/>} />
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
