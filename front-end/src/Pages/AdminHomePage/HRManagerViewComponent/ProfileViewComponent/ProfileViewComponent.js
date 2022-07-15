import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import styles from './ProfileViewComponent.module.css'
import {
  Nav,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  List,
  ListGroup,
  ListGroupItem,
  Button,
  NavLink,
} from 'reactstrap'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import authService from '../../../../services/auth.service'

function Maritalstate(isMarried) {
  if (isMarried == 0) {
    return 'Single'
  } else {
    return 'Married'
  }
}

function ProfileView(props) {
  const profileStyleClass = 'rounded-circle ' + styles['profile-dp']
  const location = useLocation() //route states
  const hrmanager = location.state
  const navigate = useNavigate()

  const [departments, setDepartments] = useState([])
  const [empStatus, setEmpStatus] = useState([])
  const [payGrades, setPayGrades] = useState([])
  const [userTypes, setUserTypes] = useState([])

  const [show, setShow] = useState(false)
  const handleClose = (e) => {
    e.preventDefault()
    setShow(false)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    Axios.get('http://localhost:3001/api/admin/getDepartments', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setDepartments(res.data.result)
    })

    Axios.get('http://localhost:3001/api/admin/getStatus', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmpStatus(res.data.result)
    })

    Axios.get('http://localhost:3001/api/admin/getPaygrades', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setPayGrades(res.data.result)
    })

    Axios.get('http://localhost:3001/api/admin/getTypes', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setUserTypes(res.data.result)
    })
  }, [])

  const getDepartmentById = (ID) => {
    for (let dept_id in departments) {
      if (departments[dept_id].dept_id == ID) {
        return departments[dept_id].name
      }
    }
  }

  const getEmpStatusById = (ID) => {
    let status = ''
    for (let emp_status_id in empStatus) {
      if (empStatus[emp_status_id].emp_status_id == ID) {
        status = empStatus[emp_status_id]
      }
    }

    let time = 'full time'
    if (status.is_full_time == 0) {
      time = 'part time'
    }

    return status.name + ' - ' + time
  }

  const getPayGradeById = (ID) => {
    for (let paygrade_id in payGrades) {
      if (payGrades[paygrade_id].paygrade_id == ID) {
        return payGrades[paygrade_id].name
      }
    }
  }

  const deleteHRM = (e) => {
    e.preventDefault()
    const data = {
      emp_id: hrmanager.emp_id,
      profile_picture: hrmanager.profile_picture,
    }
    Axios.post(`http://localhost:3001/api/admin/hr-manager-delete`, data, {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      if (res.data.success) {
        navigate('/admin')
      } else {
        alert('a fail')
      }
    })
  }

  function showExtraAttributes(col_name) {
    if (col_name != 'profile_picture' && col_name != 'job_type_title') {
      return (
        <div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-6">{col_name.split('_').join(' ')}</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {hrmanager[col_name] === null || hrmanager[col_name] === ''
                ? 'undefined'
                : hrmanager[col_name]}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <div className={styles['main-body']}>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/admin" className={styles['breadcrumb-link']}>
                Staff
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {hrmanager.first_name + ' ' + hrmanager.last_name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{hrmanager.first_name + ' ' + hrmanager.last_name}</h3>
            <hr />
          </div>
        </div>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            {/*Profile picture and basic information*/}
            <Card>
              <CardBody>
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={`http://localhost:3001/profilePictures/${
                      hrmanager.profile_picture
                        ? hrmanager.profile_picture
                        : 'default.jpg'
                    }`}
                    alt={hrmanager.first_name + ' ' + hrmanager.last_name}
                    className={profileStyleClass}
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>
                      {hrmanager.first_name +
                        ' ' +
                        hrmanager.middle_name +
                        ' ' +
                        hrmanager.last_name}
                    </h4>
                    <p className="text-secondary mb-1">
                      {hrmanager.job_type_title}
                    </p>
                    <p className="text-muted font-size-sm">
                      {getDepartmentById(hrmanager.dept_id) + ' Department'}
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <Link to={`/admin/hr-profile/edit/${hrmanager.emp_id}`}>
                        <Button className="fa fa-pencil">Edit</Button>
                      </Link>
                    </div>

                    <div className="col-6">
                      <Button className="fa fa-trash" onClick={handleShow}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/*Contact information*/}
            <Card className="mt-3">
              <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                  {/*<i className="fa fa-envelope fa-2x"></i>*/}
                  <div className="col-1">
                    <h6 className="fa fa-envelope fa-1x"></h6>
                  </div>
                  <div className="col-2">
                    <h6>Email</h6>
                  </div>
                  <div className="col-8">
                    <h6>{hrmanager.email}</h6>
                  </div>
                </ListGroupItem>

                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                  {/*<i className="fa fa-envelope fa-2x"></i>*/}
                  <div className="col-1">
                    <h6 className="fa fa-phone fa-1x"></h6>
                  </div>
                  <div className="col-2">
                    <h6>Mobile</h6>
                  </div>
                  <div className="col-8">
                    <h6>{hrmanager.contact_num}</h6>
                  </div>
                </ListGroupItem>

                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                  {/*<i className="fa fa-envelope fa-2x"></i>*/}
                  <div className="col-1">
                    <h6 className="fa fa-home fa-1x"></h6>
                  </div>
                  <div className="col-2">
                    <h6>Post</h6>
                  </div>
                  <div className="col-8">
                    <h6>{hrmanager.address}</h6>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </div>

          <div className="col-md-8">
            <Card className="mb-3">
              <CardBody>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.first_name +
                      ' ' +
                      hrmanager.middle_name +
                      ' ' +
                      hrmanager.last_name}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Employee ID</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.emp_id}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">NIC</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{hrmanager.nic}</div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">BirthDay</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.bday}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Marital State</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {Maritalstate(hrmanager.is_married)}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Emergency Contact</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.emergency_contact}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Employee Status</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {getEmpStatusById(hrmanager.emp_status_id)}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Pay-Grade</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {getPayGradeById(hrmanager.paygrade_id)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Designation</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.job_type_title}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Bank Account Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {hrmanager.bank_account_num}
                  </div>
                </div>

                <div>
                  <p>
                    {Object.keys(hrmanager).slice(18).map(showExtraAttributes)}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* modal for adding img */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Title>Delete HR Manager</Modal.Title>
        </Modal.Header>
        <form style={{ backgroundColor: '#f5f6fa' }}>
          <Modal.Body>
            <div className="row">
              <div className="col-11">
                <h5>Are you sure you want to delete this record? </h5>
                <h5>You are removing a supervisor. make sure to assign new supervisors for the subordinates</h5>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleClose} className="btn btn-secondary">
              Close
            </button>
            <button type="submit" className="btn btn-light" onClick={deleteHRM}>
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default ProfileView
