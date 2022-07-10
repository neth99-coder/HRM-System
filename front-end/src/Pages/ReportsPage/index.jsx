import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap'
import styles from './index.module.css'
import Axios from 'axios'
import Profile from './EmployeeDetailsComponent/ProfileViewPage'
import AttendanceReport from './AttendanceDetailsComponent/AttendanceReport'
import LeaveReport from './GrantedLeavesDetailsComponent/GrantedLeavesReport'
import StaffReport from './StaffDetailsReportComponent/StaffDetailsReport'
import { Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import authService from '../../services/auth.service'

const Index = () => {
  const componentRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [reportId, setReportId] = useState(-1)
  const [employeeIds, setEmployeeIds] = useState([])
  const [jobTypes, setJobTypes] = useState([])
  const [departments, setDepartments] = useState([])
  const [empStatus, setEmpStatus] = useState([])
  const [payGrades, setPayGrades] = useState([])

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

  const [leavefromdate, setleaveFromDate] = useState('')
  const [leavetodate, setleaveToDate] = useState('')

  const [criteriaId, setCriteriaID] = useState('')
  const [criteria, setCriteria] = useState('')

  const [isLoadedEmployee, setisLoadedEmployee] = useState(false)
  const [isLoadedAttendance, setisLoadedAttendance] = useState(false)
  const [isLoadedLeaves, setisLoadedLeaves] = useState(false)
  const [isLoadedGroupedEmployee, setisLoadedGroupedEmployee] = useState(false)

  const [employee, setEmployee] = useState([])
  const [attendance, setAttendance] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/hrManager/getEmployeeIds', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmployeeIds(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getJobTypes', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setJobTypes(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getDepartments', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setDepartments(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getPaygrades', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setPayGrades(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getStatus', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmpStatus(res.data.result)
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

  const setEmpty = () => {
    setEmployee([])
    setAttendance([])
    setResult([])
    setisLoadedEmployee(false)
    setisLoadedAttendance(false)
    setisLoadedLeaves(false)
    setisLoadedGroupedEmployee(false)
    setShowButton(false)
  }

  const loadEmployee = (e) => {
    e.preventDefault()
    setEmpty()
    if (empId.length !== 0) {
      Axios.get(`http://localhost:3001/api/employee/getemployee/${empId}`, {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setEmployee(res.data.result[0])
        setisLoadedEmployee(true)
      })
      setShowButton(true)
    } else {
      alert('Please fill all the fields')
    }

    handleClose_0()
    setReportId(-1)
    setEmpID('')
    setleaveFromDate('')
    setleaveToDate('')
    setFromDate('')
    setToDate('')
    setCriteria('')
    setCriteriaID('')
  }

  const loadAttendance = (e) => {
    e.preventDefault()
    setEmpty()

    const data = {
      emp_id: empId,
      from: fromdate,
      to: todate,
    }
    if (empId.length !== 0 && fromdate.length !== 0 && todate.length !== 0) {
      Axios.post('http://localhost:3001/api/hrManager/getAttendance', data, {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setAttendance(res.data.result)
        setisLoadedAttendance(true)
      })

      Axios.get(`http://localhost:3001/api/employee/getemployee/${empId}`, {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setEmployee(res.data.result[0])
      })

      setShowButton(true)
    } else {
      alert('Please fill all the fields')
    }

    handleClose_1()
    setReportId(-1)
    setEmpID('')
    setleaveFromDate('')
    setleaveToDate('')
    setCriteria('')
    setCriteriaID('')
  }

  const loadLeaves = (e) => {
    e.preventDefault()
    setEmpty()

    const data = {
      emp_id: empId,
      from: fromdate,
      to: todate,
    }
    if (
      empId.length !== 0 &&
      leavefromdate.length !== 0 &&
      leavetodate.length !== 0
    ) {
      Axios.post('http://localhost:3001/api/hrManager/getLeaves', data, {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setResult(res.data.result)
        setisLoadedLeaves(true)
      })

      Axios.get(`http://localhost:3001/api/employee/getemployee/${empId}`, {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setEmployee(res.data.result[0])
      })

      setShowButton(true)
    } else {
      alert('Please fill all the fields')
    }

    handleClose_2()
    setReportId(-1)
    setEmpID('')
    setFromDate('')
    setToDate('')
    setCriteria('')
    setCriteriaID('')
  }

  const loadGroupedEmployee = (e) => {
    e.preventDefault()
    setEmpty()

    const data = {
      id: criteriaId,
      value: criteria,
    }

    if (criteria.length !== 0 && criteriaId.length !== 0) {
      Axios.post(
        'http://localhost:3001/api/hrManager/getEmployeesByIDs',
        data,
        {
          headers: { 'x-auth-token': authService.getUserToken() },
        },
      ).then((res) => {
        setResult(res.data.result)
        setisLoadedGroupedEmployee(true)
      })
      setShowButton(true)
    } else {
      alert('Please fill all the fields')
    }

    handleClose_3()
    setReportId(-1)
    setEmpID('')
    setleaveFromDate('')
    setleaveToDate('')
  }

  const filterOption = () => {
    switch (criteriaId) {
      case 'dept_id':
        return (
          'Department : ' +
          departments.filter((department) => department.dept_id == criteria)[0]
            .name
        )

      case 'paygrade_id':
        return (
          'Pay grade : ' +
          payGrades.filter((paygrade) => paygrade.paygrade_id == criteria)[0]
            .name
        )

      case 'emp_status_id':
        return (
          'Employee Status : ' +
          empStatus.filter((status) => status.emp_status_id == criteria)[0].name
        )

      case 'job_type_id':
        return (
          'Designation : ' +
          jobTypes.filter((job) => job.job_type_id == criteria)[0]
            .job_type_title
        )
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
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
                    {reportId === -1 && (
                      <option value={''} hidden={true}>
                        Select Report Type
                      </option>
                    )}
                    <option value={0}>Employee Details</option>
                    <option value={1}>Employee Attendance</option>
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

        {isLoadedEmployee && <Profile ref={componentRef} employee={employee} />}

        {isLoadedAttendance && (
          <AttendanceReport
            ref={componentRef}
            employee={employee}
            jobTypes={jobTypes}
            departments={departments}
            start_date={fromdate}
            end_date={todate}
            result={attendance}
          />
        )}

        {isLoadedLeaves && (
          <LeaveReport
            ref={componentRef}
            employee={employee}
            jobTypes={jobTypes}
            departments={departments}
            start_date={leavefromdate}
            end_date={leavetodate}
            result={result}
          />
        )}
        {isLoadedGroupedEmployee && (
          <StaffReport
            ref={componentRef}
            topic={filterOption()}
            result={result}
          />
        )}

        {/* modal for Employee Details */}
        <Modal show={show_0} onHide={() => handleClose(0)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select employee ID..</Modal.Title>
          </Modal.Header>
          <form style={{ backgroundColor: '#f5f6fa' }}>
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
                className="btn btn-primary"
                onClick={loadEmployee}
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
          <form
            style={{ backgroundColor: '#f5f6fa' }}
          >
            <Modal.Body>
              <Input type="select" onChange={(e) => setEmpID(e.target.value)}>
                <option value={''} hidden={true}>
                  Select Employee ID
                </option>
                {employeeIds.map(({ emp_id }) => {
                  return <option value={emp_id}>{emp_id}</option>
                })}
              </Input>

              <h6 style={{ marginTop: '20px', letterSpacing: '2.5px' }}>
                Time Period
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
                min={fromdate}
              />
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(1)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={loadAttendance}
                className="btn btn-primary"
              >
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
            <Modal.Body>
              <Input type="select" onChange={(e) => setEmpID(e.target.value)}>
                <option value={''} hidden={true}>
                  Select Employee ID
                </option>
                {employeeIds.map(({ emp_id }) => {
                  return <option value={emp_id}>{emp_id}</option>
                })}
              </Input>

              <h6 style={{ marginTop: '20px', letterSpacing: '2.5px' }}>
                Time Period
              </h6>
              <hr />
              <Label htmlFor="from" style={{ display: 'inline' }}>
                From:
              </Label>
              <Input
                type="date"
                id="from"
                onChange={(e) => setleaveFromDate(e.target.value)}
              />

              <Label htmlFor="from" style={{ display: 'inline' }}>
                To:
              </Label>
              <Input
                type="date"
                id="from"
                onChange={(e) => setleaveToDate(e.target.value)}
                min={leavefromdate}
              />
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(2)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loadLeaves}
              >
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* modal for Employee Details */}
        <Modal show={show_3} onHide={() => handleClose(3)} centered>
          <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
            <Modal.Title>Select the grouping criteria..</Modal.Title>
          </Modal.Header>
          <form
            style={{ backgroundColor: '#f5f6fa' }}
          >
            <Modal.Body>
              <Input
                type="select"
                onChange={(e) => setCriteriaID(e.target.value)}
                style={{ marginBottom: '10px' }}
              >
                <option value={''} hidden={true}>
                  Select the grouping criteria
                </option>
                <option value={'dept_id'}>By Department</option>
                <option value={'paygrade_id'}>By Pay Grade</option>
                <option value={'emp_status_id'}>By Employee Status</option>
                <option value={'job_type_id'}>By Designation</option>
              </Input>

              {criteriaId == 'dept_id' && (
                <Input
                  type="select"
                  onChange={(e) => setCriteria(e.target.value)}
                >
                  <option value={''} hidden={true}>
                    Select the department
                  </option>
                  {departments.map(({ dept_id, name }) => {
                    return <option value={dept_id}>{name}</option>
                  })}
                </Input>
              )}

              {criteriaId == 'paygrade_id' && (
                <Input
                  type="select"
                  onChange={(e) => setCriteria(e.target.value)}
                >
                  <option value={''} hidden={true}>
                    Select the pay grade
                  </option>
                  {payGrades.map(({ paygrade_id, name, salary }) => {
                    return <option value={paygrade_id}>{name}</option>
                  })}
                </Input>
              )}

              {criteriaId == 'emp_status_id' && (
                <Input
                  type="select"
                  onChange={(e) => setCriteria(e.target.value)}
                >
                  <option value={''} hidden={true}>
                    Select the employee status
                  </option>
                  {empStatus.map(({ emp_status_id, name, is_full_time }) => {
                    return (
                      <option value={emp_status_id}>
                        {name}{' '}
                        {/* {is_full_time == 0 ? 'part time' : 'full time'} */}
                      </option>
                    )
                  })}
                </Input>
              )}

              {criteriaId == 'job_type_id' && (
                <Input
                  type="select"
                  onChange={(e) => setCriteria(e.target.value)}
                >
                  <option value={''} hidden={true}>
                    Select the designation
                  </option>
                  {jobTypes.map(({ job_type_id, job_type_title }) => {
                    return <option value={job_type_id}>{job_type_title}</option>
                  })}
                </Input>
              )}
            </Modal.Body>

            <Modal.Footer>
              <button
                onClick={() => handleClose(3)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loadGroupedEmployee}
              >
                Load
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      )}
    </div>
  )
}

export default Index
