import React, {useState} from "react";
import Header from "../../Components/Header/Header";
import ToggleSwitch from "../../Components/UI/ToggleSwitch/ToggleSwitch";

import { Table, Dropdown, Button } from "react-bootstrap";

import styled from "./index.module.css";

function AttendancePage() {

  const [employeeFilter, setEmployeeFilter] = useState("Select Employee");
    // filtered empolyees
    const [employees, setEmployees] = useState([
      { id: "190312L", name: "Amal Kularathne" },
      { id: "190222T", name: "Amal Shantha" },
      { id: "190412N", name: "Amal Nishantha" },
      { id: "190122T", name: "Amal Shantha" },
      { id: "194122N", name: "Amal Nishantha" },
      { id: "180222T", name: "Amal Shantha" },
      { id: "184412N", name: "Amal Nishantha" },
      { id: "185222T", name: "Amal Shantha" },
      { id: "186412N", name: "Amal Nishantha" },
      { id: "181222T", name: "Amal Shantha" },
      { id: "180412N", name: "Amal Nishantha" },
    ]);

  // Need to import these details from the server
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  // Current User leave data
  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };



  return (
    <>
      <Header className={styled["main-header"]} profileDetails={profileDetails} companyDetails={companyDetails} />

      <main className={styled["main"]}>
        <Dropdown className={styled["employee-select-container"]}>
          <Dropdown.Toggle className={styled["employee-select"]} variant="primary" id="dropdown-basic">
            <span className={styled["employee-text"]}>{employeeFilter}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{setEmployeeFilter("Admin")}}>Admin</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setEmployeeFilter("HR Manager")}}>HR Manager</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setEmployeeFilter("Supervisor")}}>Supervisor</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Table bordered hover className={styled["table"]}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>data 1</th>
              <th className={styled["absent-header"]}>Absence status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              return (
                <tr>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.name}</td>
                  <td>
                    <ToggleSwitch id={employee.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Button className={styled['save-button']} variant="primary">Save Changes</Button>{' '}
      </main>
    </>
  );
}

export default AttendancePage;
