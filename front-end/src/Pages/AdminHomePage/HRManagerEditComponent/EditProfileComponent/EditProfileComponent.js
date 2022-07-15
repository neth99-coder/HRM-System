import React, { Component, useState } from 'react'
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
import { Spinner } from 'react-bootstrap'
import styles from '../../../RequestPage/RequestPage.module.css'
import defaultPic from '../../../../assets/profile_picture/default.jpg'
import { useEffect } from 'react'
import Axios from 'axios'
import ReactImageUploading from 'react-images-uploading'
import authService from '../../../../services/auth.service'

function EditProfile(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [employee, setEmployee] = useState([])

  const [departments, setDepartments] = useState([])
  const [profilePicture, setProfilePicture] = useState()
  const [status, setStatus] = useState([])
  const [jobs, setJobs] = useState([])
  const [payGrades, setPayGrades] = useState([])

  const [Image, setImage] = useState({})
  const [imageName, setImageName] = useState()
  const [isDpChanged, setIsDpChanged] = useState(false)
  const [employeeNew, setEmployeeNew] = useState({})
  const [changeList, setChangeList] = useState([])

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true)

    Axios.get(
      'http://localhost:3001/api/admin/getemployee/' + props.empID,
      {
        headers: { 'x-auth-token': authService.getUserToken() },
      },
    ).then((res) => {
      setEmployee(res.data.result[0])
      setImageName(res.data.result[0].profile_picture)
      if (
        res.data.result[0].profile_picture !== undefined &&
        res.data.result[0].profile_picture !== ''
      ) {
        setProfilePicture(
          'http://localhost:3001/profilePictures/' +
            res.data.result[0].profile_picture,
        )
      } else {
        setProfilePicture(defaultPic)
      }
    })

    Axios.get('http://localhost:3001/api/admin/getDepartments', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setDepartments(res.data.result)
    })

      Axios.get('http://localhost:3001/api/admin/getStatus', {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setStatus(res.data.result)
      })

      Axios.get('http://localhost:3001/api/admin/getPaygrades', {
        headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        setPayGrades(res.data.result)
      })

      Axios.get('http://localhost:3001/api/admin/getJobTypes',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then((res) => {
      setJobs(res.data.result)
    })

    setIsLoading(false)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = [
      employee.first_name,
      employee.middle_name,
      employee.last_name,
      employee.address,
      employee.nic,
      employee.bday,
      employee.is_married,
      employee.contact_num,
      employee.emergency_contact,
      employee.email,
      employee.dept_id,
      employee.paygrade_id,
      employee.emp_status_id,
      employee.type_id,
      imageName,
      employee.job_type_id,
      employee.bank_account_num,
    ]
    for (let j = 0; j < Object.keys(props.employeeFull).length - 18; j++) {
      const col_name = Object.keys(props.employeeFull)[18 + j]
      if (changeList.includes(col_name)) {
        formData.push(employeeNew[col_name])
      } else {
        formData.push(props.employeeFull[col_name])
      }
    }
    formData.push(employee.emp_id)
    const formValues = {
      keys: Object.keys(props.employeeFull),
      values: formData,
    }

    Axios.post(
      'http://localhost:3001/api/admin/updateEmployee',
      formValues,
      {
        headers: { 'x-auth-token': authService.getUserToken() },
      },
    ).then(async (res) => {
      if (!res.data.success) {
        alert('Error occured!!')
      } else if (isDpChanged) {
        const formData = new FormData()
        formData.append('file', Image)
        formData.append('fileName', imageName)
        await Axios.post(
          'http://localhost:3001/api/admin/dpUpload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-auth-token': authService.getUserToken(),
            },
          },
        )
      }

      navigate('/admin')
    })
  }

  function onImgUpload(imageList, addUpdateIndex) {
    setProfilePicture(imageList[0].dataURL)
    setImage(imageList[0].file)
    setImageName(employee.emp_id + imageList[0].file.name)
    setIsDpChanged(true)
  }

  function formatDate(n){
    if(n< 10){
        return "0" + n;
    }else{
        return n;
    }
}

  function showExtraAttributes(col_name) {
    const result = props.dataTypes.filter(
      (dataType) => dataType.COLUMN_NAME === col_name,
    )[0].DATA_TYPE
    let type = 'number'
    if (result === 'varchar') {
      type = 'text'
    }
    if (!changeList.includes(col_name)) {
      return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
          <FormGroup>
            <label htmlFor={col_name}>{col_name}</label>
            <input
              type={type}
              className={Styles['form-control']}
              id={col_name}
              name={col_name}
              required={true}
              value={props.employeeFull[col_name]}
              placeholder={'Enter ' + col_name}
              onChange={handleInputChangeExtra}
            />
          </FormGroup>
        </div>
      )
    } else {
      return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
          <FormGroup>
            <label htmlFor={col_name}>{col_name}</label>
            <input
              type={type}
              className={Styles['form-control']}
              id={col_name}
              name={col_name}
              required={true}
              value={employeeNew[col_name]}
              placeholder={'Enter ' + col_name}
              onChange={handleInputChangeExtra}
            />
          </FormGroup>
        </div>
      )
    }
  }

  function handleInputChangeExtra(event) {
    const name = event.target.name
    const value = event.target.value
    const employeeTemp = JSON.parse(JSON.stringify(employeeNew))
    employeeTemp[name] = value
    setEmployeeNew(JSON.parse(JSON.stringify(employeeTemp)))
    changeList.push(name)
  }

  const findDepartmentById = () => {
    for (let dept_id in departments) {
      if (departments[dept_id].dept_id == employee.dept_id) {
        return departments[dept_id].name
      }
    }
  }

  function findJobById() {
    let job = jobs.filter((job) => job.job_type_id === employee.job_type_id)
    if (job.length === 0) {
      return ''
    } else {
      return job[0].job_type_title
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className="container">
            <div>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/admin" className={Styles['breadcrumb-link']}>
                    Staff
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {employee.first_name + ' ' + employee.last_name}
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
                              src={profilePicture}
                              alt={employee.first_name + ' ' + employee.last_name}
                            />
                          </div>

                          <div>
                            <ReactImageUploading
                              value={[]}
                              onChange={onImgUpload}
                              maxNumber={1}
                              acceptType={['jpg', 'png']}
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                <div className="upload__image-wrapper">
                                  <button
                                    className="btn btn-primary"
                                    style={
                                      isDragging ? { color: 'red' } : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >
                                    Change Image
                                  </button>
                                  &nbsp;
                                  {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                      <img
                                        src={image['data_url']}
                                        alt=""
                                        width="100"
                                      />
                                      <div className="image-item__btn-wrapper">
                                        <button
                                          onClick={() => onImageUpdate(index)}
                                        >
                                          Update
                                        </button>
                                        <button
                                          onClick={() => onImageRemove(index)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </ReactImageUploading>
                          </div>

                          <h5 className="user-name">
                            {employee.first_name + ' ' + employee.last_name}
                          </h5>
                          <h6 className="user-email">{employee.email}</h6>
                        </div>
                        <div className={Styles['about']}>
                          <h3>About</h3>
                          <strong>
                          {/* jobs.filter(({job_type_id,job_type_title})=>  job_type_id === jobType)[0].job_type_title */}
                            {findJobById()} - {findDepartmentById()}
                          </strong>
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
                            <h6 className="mb-2 text-primary">
                              Personal Details
                            </h6>
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
                                onChange={(e)=>setEmployee({...employee,first_name:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,middle_name:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,last_name:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,address:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,email:e.target.value})}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="contactNum">Contact Number</label>
                              <input
                                type="tel"
                                className={Styles['form-control']}
                                id="contactNum"
                                name="contactNum"
                                pattern="[0-9]{9,11}"
                                required={true}
                                value={employee.contact_num}
                                placeholder="Enter Contact Number"
                                onChange={(e)=>setEmployee({...employee,contact_num:e.target.value})}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="emergencyNum">
                                Emergency Number
                              </label>
                              <input
                                type="tel"
                                className={Styles['form-control']}
                                id="emergencyNum"
                                name="emergencyNum"
                                pattern="[0-9]{9,11}"
                                required={true}
                                value={employee.emergency_contact}
                                placeholder="Enter Emergency Number"
                                onChange={(e)=>setEmployee({...employee,emergency_contact:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,nic:e.target.value})}
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
                                min={(new Date().getFullYear()-80)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                                max={(new Date().getFullYear()-16)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                                required={true}
                                value={employee.bday}
                                placeholder="Select Birthday"
                                onChange={(e)=>setEmployee({...employee,bday:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,is_married:e.target.value})}
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
                                onChange={(e)=>setEmployee({...employee,emp_id:e.target.value})}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="empStatusId">
                                Employee status
                              </label>
                              <select
                                className={Styles['form-control']}
                                id="empStatusId"
                                name="empStatusId"
                                placeholder="Select Status"
                                required={true}
                                value={employee.emp_status_id}
                                onChange={(e)=>setEmployee({...employee,emp_status_id:e.target.value})}
                              >
                                {status.map(
                                  ({ emp_status_id, name }, index) => (
                                    <option value={emp_status_id}>
                                      {name}
                                    </option>
                                  ),
                                )}
                              </select>
                            </FormGroup>
                          </div>

                          
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="paygradeID">Bank Account Num</label>
                              <input
                                type='text'
                                className={Styles['form-control']}
                                id="bank_account_num"
                                name="bank_account_num"
                                required={true}
                                value={employee.bank_account_num}
                                onChange={(e)=>setEmployee({...employee,bank_account_num:e.target.value})}
                              />
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
                                onChange={(e)=>setEmployee({...employee,paygrade_id:e.target.value})}
                              >
                                {payGrades.map(
                                  ({ paygrade_id, name }, index) => (
                                    <option value={paygrade_id}>{name}</option>
                                  ),
                                )}
                              </select>
                            </FormGroup>
                          </div>

                          {Object.keys(props.employeeFull)
                            .slice(18)
                            .map(showExtraAttributes)}
                        </div>

                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                              <Link to={'/admin'}>
                                <button
                                  type="button"
                                  id="cancel"
                                  name="cancel"
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
        </>
      )}
    </div>
  )
}

export default EditProfile
