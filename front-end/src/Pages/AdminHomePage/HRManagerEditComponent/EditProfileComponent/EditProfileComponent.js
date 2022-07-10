import { React, useState, useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Form,
  FormGroup,
} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './EditProfie.module.css'
import Axios from 'axios'
import authService from "../../../../services/auth.service";


function EditProfile(props) {
  const [employee, setEmployee] = useState({
    first_name: props.employee.first_name,
    middle_name: props.employee.middle_name,
    last_name: props.employee.last_name,
    email: props.employee.email,
    address: props.employee.address,
    nic: props.employee.nic,
    bday: props.employee.bday,
    is_married: props.employee.is_married,
    contact_num: props.employee.contact_num,
    emergency_contact: props.employee.emergency_contact,
    paygrade_id: props.employee.paygrade_id,
    emp_status_id: props.employee.emp_status_id,
    dept_id: props.employee.dept_id,
    profile_picture: props.employee.profile_picture,
    type_id: props.employee.type_id,
    job_type_id:props.employee.job_type_id,
    emp_id: props.employee.emp_id,
  
  })

  const [departments, setDepartments] = useState([])
  const [empStatus, setEmpStatus] = useState([])
  const [payGrades, setPayGrades] = useState([])
  const [userTypes, setUserTypes] = useState([])
  const [jobTypes, setJobTypes] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/hrManager/getDepartments',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then(
      (res) => {
        setDepartments(res.data.result)
      },
    )

    Axios.get('http://localhost:3001/api/hrManager/getStatus',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then((res) => {
      setEmpStatus(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getPaygrades',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then(
      (res) => {
        setPayGrades(res.data.result)
      },
    )

    Axios.get('http://localhost:3001/api/hrManager/getTypes',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then((res) => {
      setUserTypes(res.data.result)
    })

    Axios.get('http://localhost:3001/api/hrManager/getJobTypes',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then((res) => {
      setJobTypes(res.data.result)
    })
  }, [])

  const getDepartmentById = (ID)=>{
    for(let dept_id in departments){
        if (departments[dept_id].dept_id == ID){
            return departments[dept_id].name;
        }
    }
}

  

  const getJobTypeById = (ID) => {
    for (let type in jobTypes) {
      if (jobTypes[type].job_type_id === ID) {
        return jobTypes[type].job_type_title
      }
    }
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post(
      'http://localhost:3001/api/employee/updateemployee',
      employee,{
          headers: { "x-auth-token": authService.getUserToken() },
        }

    ).then((res) => {
      if (res.data.success) {
        alert('successfully updated')
        navigate('/admin')
      } else {
        alert('a fail')
      }
    })
  }

  // function showExtraAttributes(col_name) {

  //   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
  //                     <FormGroup>
  //                       <label htmlFor="emergencyNum">{col_name}</label>
  //                       <input
  //                         type="text"
  //                         className={Styles['form-control']}
                       
  //                         required={true}
  //                         value={employee[col_name]}
  //                         readOnly={true}
  //                         onChange={(e) => {
  //                           setEmployee({ ...employee, : e.target.value })
  //                         }}
  //                       />
  //                     </FormGroup>
  //                   </div>


  //   if(col_name != "profile_picture" && col_name != "job_type_title"){
  //     return (
  //       <div>
  //         <hr />
  //         <div className="row">
  //           <div className="col-sm-3">
  //             <h6 className="mb-6">{col_name.split('_').join(" ")}</h6>
  //           </div>
  //           <div className="col-sm-9 text-secondary">
  //             {props.employee[col_name] === null ||
  //             props.employee[col_name] === ''
  //               ? 'undefined'
  //               : props.employee[col_name]}
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }


  return (
    <div className="container">
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/admin" className={Styles['breadcrumb-link']}>
              {employee.first_name + ' ' + employee.last_name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Edit</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="text-primary">Edit Profile</h1>
        <hr />

        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className={Styles['account-settings']}>
                  <div className={Styles['user-profile']}>
                    <div className={Styles['user-avatar']}>
                      <img
                        className={Styles['profile-dp']}
                        src={`http://localhost:3001/profilePictures/${employee.profile_picture ? employee.profile_picture : 'default.jpg'}`}
                        alt={employee.first_name + ' ' + employee.last_name}
                      />
                    </div>
                    <h5 className="user-name">
                      {employee.first_name + ' ' + employee.last_name}
                    </h5>
                    <h6 className="user-email">{employee.email}</h6>
                  </div>
                  <div className={Styles['about']}>
                    <h5>About</h5>
                    <p>
                      {getJobTypeById(employee.job_type_id)} -{' '}
                      {getDepartmentById(employee.dept_id)} Department
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <FormGroup>
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="firstName"
                          name="firstName"
                          required={true}
                          value={employee.first_name}
                          placeholder="Enter first name"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              first_name: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <FormGroup>
                        <label htmlFor="middleName">Middle Name</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="middleName"
                          name="middleName"
                          required={true}
                          value={employee.middle_name}
                          placeholder="Enter middle name"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              middle_name: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <FormGroup>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="lastName"
                          name="lastName"
                          required={true}
                          value={employee.last_name}
                          placeholder="Enter last name"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              last_name: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="address"
                          name="address"
                          required={true}
                          value={employee.address}
                          placeholder="Enter Address"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              address: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className={Styles['form-control']}
                          id="email"
                          name="email"
                          required={true}
                          value={employee.email}
                          placeholder="Enter Email Address"
                          onChange={(e) => {
                            setEmployee({ ...employee, email: e.target.value })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="contactNum">Contact Number</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="contactNum"
                          name="contactNum"
                          required={true}
                          value={employee.contact_num}
                          placeholder="Enter Contact Number"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              contact_num: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="emergencyNum">Emergency Number</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="emergencyNum"
                          name="emergencyNum"
                          required={true}
                          value={employee.emergency_contact}
                          placeholder="Enter Emergency Number"
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              emergency_contact: e.target.value,
                            })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="nic">NIC</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="nic"
                          name="nic"
                          required={true}
                          value={employee.nic}
                          placeholder="Enter NIC Number"
                          onChange={(e) => {
                            setEmployee({ ...employee, nic: e.target.value })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="bday">Birthday</label>
                        <input
                          type="date"
                          className={Styles['form-control']}
                          id="bday"
                          name="bday"
                          required={true}
                          value="2012-02-01"
                          placeholder="Select Birthday"
                          onChange={(e) => {
                            setEmployee({ ...employee, bday: e.target.value })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="isMarried">Marital Status</label>
                        <select
                          className={Styles['form-control']}
                          id="isMarried"
                          name="isMarried"
                          placeholder="Select Marital Status"
                          required={true}
                          value={employee.is_married}
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              is_married: e.target.value,
                            })
                          }}
                        >
                          <option value={0}>Single</option>
                          <option value={1}>Married</option>
                        </select>
                      </FormGroup>
                    </div>
                  </div>

                  <hr />

                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mt-3 mb-2 text-primary">
                        Employee Details
                      </h6>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="emergencyNum">Employee ID</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="empID"
                          name="empID"
                          required={true}
                          value={employee.emp_id}
                          placeholder="Enter Employee ID"
                          readOnly={true}
                          onChange={(e) => {
                            setEmployee({ ...employee, emp_id: e.target.value })
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="empStatusId">Employee status</label>
                        <select
                          className={Styles['form-control']}
                          id="empStatusId"
                          name="empStatusId"
                          placeholder="Select Status"
                          required={true}
                          value={employee.emp_status_id}
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              emp_status_id: e.target.value,
                            })
                          }}
                        >
                          {empStatus.map(({ emp_status_id, name , is_full_time}, index) => (
                            <option value={emp_status_id}>{name}{ is_full_time == 1 ? ' - full time' :' - part time'}</option>
                          ))}

                        
                        </select>
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="paygradeID">Pay-Grade</label>
                        <select
                          className={Styles['form-control']}
                          id="paygradeID"
                          name="paygradeID"
                          placeholder="Select pay-grade"
                          required={true}
                          value={employee.paygrade_id}
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              paygrade_id: e.target.value,
                            })
                          }}
                        >
                          {payGrades.map(({ paygrade_id, name, salary}, index) => (
                            <option value={paygrade_id}>{name}</option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <FormGroup>
                        <label htmlFor="emergencyNum">Employee ID</label>
                        <input
                          type="text"
                          className={Styles['form-control']}
                          id="empID"
                          name="empID"
                          required={true}
                          value={employee.emp_id}
                          placeholder="Enter Employee ID"
                          readOnly={true}
                          onChange={(e) => {
                            setEmployee({ ...employee, emp_id: e.target.value })
                          }}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right">
                        <Link to={'/admin' + employee.emp_id}>
                          <button
                            type="button"
                            id="cancel"
                            name="cancel"
                            style={{ marginRight: '10px' }}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                        </Link>
                        <button
                          type="submit"
                          id="submit"
                          name="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
