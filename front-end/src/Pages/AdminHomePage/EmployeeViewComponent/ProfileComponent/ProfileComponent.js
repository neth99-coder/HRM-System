import { React, useState, useEffect } from 'react'
import styles from './ProfileComponent.module.css'
import authService from '../../../../services/auth.service'
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Axios from 'axios'

function Maritalstate(isMarried) {
  if (isMarried == 0) {
    return 'Single'
  } else {
    return 'Married'
  }
}

function Profile(props) {
  const profileStyleClass = 'rounded-circle ' + styles['profile-dp']
  const [departments, setDepartments] = useState({})
  const [empStatus, setEmpStatus] = useState([])
  const [payGrades, setPayGrades] = useState([])
  const [userTypes, setUserTypes] = useState([])

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

  function showExtraAttributes(col_name) {
    if(col_name != "profile_picture" && col_name != "job_type_title"){
      return (
        <div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-6">{col_name.split('_').join(" ")}</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {props.employee[col_name] === null ||
              props.employee[col_name] === ''
                ? '-'
                : props.employee[col_name]}
            </div>
          </div>
        </div>
      )
    }
    
  }

  return (
    <div>
      <div className={styles['main-body']}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link
              to="/admin"
              style={{ textDecoration: 'none', color: '#1a202c' }}
            >
              Staff
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {props.employee.first_name + ' ' + props.employee.last_name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            {/*Profile picture and basic information*/}
            <Card>
              <CardBody>
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={`http://localhost:3001/profilePictures/${props.employee.profile_picture ? props.employee.profile_picture : 'default.jpg'}`}
                    alt={
                      props.employee.first_name + ' ' + props.employee.last_name
                    }
                    className={profileStyleClass}
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>
                      {props.employee.first_name +
                        ' ' +
                        props.employee.middle_name +
                        ' ' +
                        props.employee.last_name}
                    </h4>
                    <p className="text-secondary mb-1">
                      {props.employee.type_name}
                    </p>
                    <p className="text-muted font-size-sm">
                      {getDepartmentById(props.employee.dept_id) +
                        ' Department'}
                    </p>
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
                    <h6>{props.employee.email}</h6>
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
                    <h6>{props.employee.contact_num}</h6>
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
                    <h6>{props.employee.address}</h6>
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
                    {props.employee.first_name +
                      ' ' +
                      props.employee.middle_name +
                      ' ' +
                      props.employee.last_name}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Employee ID</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.emp_id}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">NIC</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.nic}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">BirthDay</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.bday}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Marital State</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {Maritalstate(props.employee.is_married)}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Emergency Contact</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.emergency_contact}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Employee Status</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {getEmpStatusById(props.employee.emp_status_id)}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Pay-Grade</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {getPayGradeById(props.employee.paygrade_id)}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Designation</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.job_type_title}
                  </div>
                </div>
                
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-6">Bank Account Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {props.employee.bank_account_num}
                  </div>
                </div>


                <div>
                  <p>
                    {Object.keys(props.employee)
                      .slice(18)
                      .map(showExtraAttributes)}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
