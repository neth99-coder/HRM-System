/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Table, Dropdown, Button, Modal, Spinner } from "react-bootstrap";

import styled from "./index.module.css";
import authService from "../../services/auth.service";
import { useEffect } from "react";
import Axios from "axios";
import Data from "./Data";
import Attendance from "./Atteandance";

function AttendancePage() {
  const [employeeFilter, setEmployeeFilter] = useState("Select Department");
  // filtered empolyees
  const [employees, setEmployees] = useState([]);

  const [tempEmployess, setTempEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [attendanceArray, serAttendanceArray] = useState([]);

  const [marking, setMarking] = useState({});
  const [show, setShow] = useState(false); //maodal show
  const handleClose = () => setShow(false); //handle modal close
  const handleShow = () => setShow(true); //handle modal show

  const [isLoading, setIsLoading] = useState(false) ;

  useEffect(() => {
    setIsLoading(true)
    const getEmployees = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getAttendanceNotMarked",
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        setEmployees(res.data.result[0]);
        setMarking(res.data.result[1]);
      });
    };

    getEmployees();

    const getDepartments = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getDepartments", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        //console.log(res.data.result);
        setDepartments(res.data.result);
        //setIsLoading(false)
      });
    };

    getDepartments();

    const getTodayAttendance = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getTodayAttendance", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        console.log(res.data.result);
        serAttendanceArray(res.data.result);
        setIsLoading(false)
      });
    };

    getTodayAttendance();
  }, []);

  function handleFilter(e) {
    const value = e.target.name;
    const id = e.target.id;
    console.log(value);
    setEmployeeFilter(value);

    if (value !== "All") {
      //console.log(value);
      setTempEmployees(
        employees.filter((employee) => {
          return id == employee.dept_id;
        })
      );
    } else {
      setTempEmployees(employees);
      console.log(employees)
    }

    Object.keys(marking).forEach((key) => {
      marking[key] = false;
    });
  }

  function handleToggle(id) {
    setMarking((prev) => {
      return { ...prev, [id]: !marking[id] };
    });

  }

const handleSubmit = async(e)=>{
  e.preventDefault();
  const data = {result: marking, department: employeeFilter, all: employees}
  //console.log(data);
  await Axios.post("http://localhost:3001/api/hrManager/addAttendance", data, {
    headers: { "x-auth-token": authService.getUserToken() },
  }).then((res) => {
    if (!res.data.success) {
      alert("Error occured !!");
    } else {
      handleClose();
      window.location.reload(false);
    }
  });
}


  return (
    <>
      {/* <Header className={styled["main-header"]} profileDetails={profileDetails} companyDetails={companyDetails} /> */}
      {isLoading ? (
        <Spinner animation="border" role="status" className={styled['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      <main className={styled["main"]}>
        <Dropdown className={styled["employee-select-container"]}>
          <Dropdown.Toggle
            className={styled["employee-select"]}
            variant="primary"
            id="dropdown-basic"
          >
            <span className={styled["employee-text"]}>{employeeFilter}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleFilter} name="All" id="0">
              All
            </Dropdown.Item>
            {departments.map((department) => {
              return (
                <Dropdown.Item
                  onClick={handleFilter}
                  name={department.name}
                  id={department.dept_id}
                >
                  {department.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {(employeeFilter === "Select Department")?
        <div>
          <h1> Today's Attendance Sheet</h1>
        <Table bordered hover className={styled["table"]}>
        <thead>
          <div className={`row border border-3 border-light`}>
            <div className="col text-center">Employee ID</div>
            <div className="col text-center">First Name</div>
            <div className="col text-center">Last Name</div>
            <div className="col text-center">Department</div>
            <div className="col text-center">Status</div>
          </div>
        </thead>
        <tbody>
          {attendanceArray?.map((employee, index) => {
            return (
              <tr>
                <Attendance
                  employee={employee}
                  key={employee.emp_id}
                />
              </tr>
            );
          })}
        </tbody>
      </Table> </div>: <div>
        <h1> Mark Attendance</h1>
        <Table bordered hover className={styled["table"]}>
          <thead>
            <div className={`row border border-3 border-light`}>
              <div className="col text-center">Employee ID</div>
              <div className="col text-center">First Name</div>
              <div className="col text-center">Last Name</div>
              <div className="col text-center">Absence Status</div>
            </div>
          </thead>
          <tbody>
            {tempEmployess.map((employee, index) => {
              return (
                <tr>
                  <Data
                    employee={employee}
                    handleToggle={handleToggle}
                    show={marking[employee.emp_id]}
                    key={employee.emp_id}
                  />
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button className={styled["save-button"]} variant="primary" onClick={handleShow}>
          {"Save "} {employeeFilter !== "Select Department" && employeeFilter}{" "}
          {" Changes"}
        </Button>{" "}
        </div> }
        

        
        

        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title> Confirmation To Proceed </Modal.Title>{" "}
            </Modal.Header>
           
              <Modal.Body>

          {'Confirm Submission ' + employeeFilter}

              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-dark"
                >
                  Decline
                </button>
                <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
                  Confirm
                </button>
              </Modal.Footer>

          </Modal>
      </main>
      )}
    </>
  );
}

export default AttendancePage;
