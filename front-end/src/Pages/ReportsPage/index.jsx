import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap'
import styles from './index.module.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './EmployeeDetailsComponent/ProfileViewPage'
import AttendanceReport from './LeaveDetailsComponent/AttendanceReport'
import { Modal, Spinner } from 'react-bootstrap'
import { generateKey } from 'fast-key-generator'
import { useState } from 'react'
import { useEffect } from 'react'
import authService from '../../services/auth.service'

const Index = () => {
  const componentRef = useRef(null)
  const [reportId, setReportId] = useState(-1)
  const [employeeIds, setEmployeeIds] = useState([])

  const [showButton, setShowButton] = useState(false)
  const [show_0, setShow_0] = useState(false)
  const [show_1, setShow_1] = useState(false)
  const [show_2, setShow_2] = useState(false)
  const [show_3, setShow_3] = useState(false)

  const handleShow_0 = () => setShow_0(true)
  const handleShow_1 = () => setShow_1(true)
  const handleShow_2 = () => setShow_2(true)
  const handleShow_3 = () => setShow_3(true)

  const handleClose_0 = () => setShow_0(false)
  const handleClose_1 = () => setShow_1(false)
  const handleClose_2 = () => setShow_2(false)
  const handleClose_3 = () => setShow_3(false)

  const [empId, setEmpID] = useState('')
  const [fromdate, setFromDate] = useState('')
  const [todate, setToDate] = useState('')
  const [employee, setEmployee] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/hrManager/getEmployeeIds', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmployeeIds(res.data.result)
    })
  }, [])

  const handleShow = (reportId) => {
    switch (reportId) {
      case '0':
        handleShow_0()
        break

      case '1':
        handleShow_1()
        break

      case '2':
        handleShow_2()
        break

      case '3':
        handleShow_3()
        break
    }
  }

  const handleClose = (reportId) => {
    switch (reportId) {
      case '0':
        handleClose_0()
        break

      case '1':
        handleClose_1()
        break

      case '2':
        handleClose_2()
        break

      case '3':
        handleClose_3()
        break
    }
  }

  const loadEmployee = (e) => {
    setEmployee([])
    setAttendance([])
    e.preventDefault()
    Axios.get(`http://localhost:3001/api/employee/getemployee/${empId}`, {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmployee(res.data.result[0])
    })
    setShowButton(true)
    handleClose_0()
  }

  const loadAttendance = (e)=>{
    e.preventDefault()
    setEmployee([])
    setAttendance([])

    const data = {
      emp_id:empId,
      from:fromdate,
      to:todate
    }

    Axios.post('http://localhost:3001/api/hrManager/getAttendance', data,{
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setAttendance(res.data.result)
    })
    setShowButton(true)
    handleClose_1()
  }

  //   const Reports = [
  //     {
  //       id: 0,
  //       name: 'Employee Details',
  //     },
  //     {
  //       id: 1,
  //       name: 'Employee Attendace',
  //     },
  //     {
  //       id: 3,
  //       name: 'Granted Leaves',
  //     },
  //     {
  //       id: 3,
  //       name: 'Staff Details',
  //     },
  //   ]

  return (
    <div>
      <div className="col-12">
        <div
          className={`${styles['reportsHeading']} col-12`}
          style={{ marginLeft: '8px' }}
        >
          <h1>Reports</h1>
        </div>
        <Form>
          <div className="row">
            <div className="col-5">
              <FormGroup row>
                <Col lg={6}>
                  <Input
                    type="select"
                    name="reports"
                    onChange={(e) => {
                      handleShow(e.target.value)
                      setReportId(e.target.value)
                    }}
                    style={{ marginLeft: '20px' }}
                  >
                    <option value={''} hidden={true}>
                      Select Report Type
                    </option>
                    <option value={0}>Employee Details</option>
                    <option value={1}>Employee Attendace</option>
                    <option value={2}>Granted Leaves</option>
                    <option value={3}>Staff Details</option>
                  </Input>
                </Col>
              </FormGroup>
            </div>
          </div>
        </Form>

        {showButton ? (
          <div>
            <ReactToPrint
              trigger={() => (
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: '19px' }}
                >
                  Print
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        ) : (
          <div>
            <div className={`${styles['employee-profiles']}`}>
              <div className={`${styles['employee-img-container']}`}>
                <i className={`${styles['employee-img']} bx bx-book-open`}></i>
              </div>
              <div className={`${styles['employee-message']}`}>
                <p>Select the report type first...</p>
              </div>
            </div>
          </div>
        )}

        {employee.length !== 0 && (
          <Profile ref={componentRef} employee={employee} />
        )}

        {attendance.length !== 0  && (
           <AttendanceReport ref={componentRef} start_date={fromdate} end_date={todate} result={attendance}/>
        )}
       


        {/* modal for Employee Details */}
        <Modal show={show_0} onHide={() => handleClose(0)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select employee ID..</Modal.Title>
          </Modal.Header>
          <form style={{ backgroundColor: '#f5f6fa' }} onSubmit={loadEmployee}>
            <Modal.Body>
              <Input type="select" onChange={(e) => setEmpID(e.target.value)}>
                <option value={''} hidden={true}>
                  Select Employee ID
                </option>
                {employeeIds.map(({ emp_id }) => {
                  return <option value={emp_id}>{emp_id}</option>
                })}
              </Input>
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(0)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-light"
                onSubmit={loadEmployee}
              >
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* modal for Attendance Details */}
        <Modal show={show_1} onHide={() => handleClose(1)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select employee ID and time period..</Modal.Title>
          </Modal.Header>
          <form style={{ backgroundColor: '#f5f6fa' }} onSubmit={loadAttendance}>
            <Modal.Body>
              <Input type="select" onChange={(e) => setEmpID(e.target.value)}>
                <option value={''} hidden={true}>
                  Select Employee ID
                </option>
                {employeeIds.map(({ emp_id }) => {
                  return <option value={emp_id}>{emp_id}</option>
                })}
              </Input>

              <h6 style={{ marginTop: '20px',letterSpacing: '2.5px' }}>
                Leave Period
              </h6>
              <hr />
              <Label htmlFor="from" style={{ display: 'inline' }}>
                From:
              </Label>
              <Input
                type="date"
                id="from"
                onChange={(e) => setFromDate(e.target.value)}
              />

              <Label htmlFor="from" style={{ display: 'inline' }}>
                To:
              </Label>
              <Input
                type="date"
                id="from"
                onChange={(e) => setToDate(e.target.value)}
              />
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(1)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button type="submit" onSubmit={loadAttendance} className="btn btn-light">
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* modal for Employee Details */}
        <Modal show={show_2} onHide={() => handleClose(2)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select employee ID and time period..</Modal.Title>
          </Modal.Header>
          <form style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Body>Leave Details</Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(2)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button type="submit" className="btn btn-light">
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* modal for Employee Details */}
        <Modal show={show_3} onHide={() => handleClose(3)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select the criteria..</Modal.Title>
          </Modal.Header>
          <form style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Body>No of Employees</Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(3)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button type="submit" className="btn btn-light">
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary">Print this out!</button>
          )}
          content={() => componentRef.current}
        />
        <Profile ref={componentRef} /> */}
      </div>
    </div>
  )
}

export default Index
