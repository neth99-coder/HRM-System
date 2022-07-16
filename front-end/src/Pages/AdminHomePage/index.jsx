import { React, useState, useEffect } from 'react'
import styles from './index.module.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './ProfileComponent/profile.js'
import { Modal, Spinner } from 'react-bootstrap'
import { generateKey } from 'fast-key-generator'
import authService from '../../services/auth.service'

const Index = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [hrmanager, setHrmanager] = useState([])

  const navigate = useNavigate()

  const [newEmployee, setNewEmployee] = useState({
    emp_id: '',
    file: '',
    fname: '',
    mname: '',
    lname: '',
    address: '',
    nic: '',
    bday: '',
    is_married: 0,
    contact_num: '',
    emergency_contact: '',
    email: '',
    paygrade_id: 1,
    emp_status_id: 1,
    bank_account_num:'',
  })
  const [employeeIds, setEmployeeIds] = useState([])
  const [empStatus, setEmpStatus] = useState([])
  const [payGrades, setPayGrades] = useState([])
  const [dataTypes, setDataTypes] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  const [show, setShow] = useState(false)
  const handleCloseAdd = () => setShow(false)
  const handleShowAdd = () => setShow(true)

  const [showI, setShowI] = useState(false)
  const handleClose = () => setShowI(false)
  const handleShow = () => setShowI(true)

  useEffect(() => {
    setIsLoading(true)

    Axios.get('http://localhost:3001/api/admin/getemployeetypes', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      res.data.result.map((employee) => {
        if (employee.job_type_title === 'HR Manager') {
          setHrmanager(employee)
        }
      })
      setEmployees(res.data.result)
    })

    Axios.get('http://localhost:3001/api/admin/getEmployeeIds', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setEmployeeIds(res.data.result)
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

    Axios.get('http://localhost:3001/api/admin/getDataTypes', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setDataTypes(res.data.result)
      for (let i = 0; i < res.data.result.length - 17; i++) {
        newEmployee[res.data.result[i + 17].COLUMN_NAME] = ''
      }
    })

    const GenerateEmpId = () => {
      const excludeList = []
      for (let i = 0; i < employeeIds.length; i++) {
        excludeList[i] = employeeIds[i].emp_id
      }
      return generateKey({
        size: 7,
        chartype: 'numeric',
        exclude: excludeList,
      })
    }

    setNewEmployee({ ...newEmployee, emp_id: GenerateEmpId() })

    setIsLoading(false)
  }, [])

  const getColumnNames = ()=>{
    let fieldNames = [];
    for(let i = 0 ; i < dataTypes.length ; i++){
      fieldNames.push(dataTypes[i].COLUMN_NAME)
    }

    return [fieldNames]
  }

  const addRecord = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('emp_id', newEmployee.emp_id)
    formData.append('file', newEmployee.file)
    formData.append('first_name', newEmployee.fname)
    formData.append('middle_name', newEmployee.mname)
    formData.append('last_name', newEmployee.lname)
    formData.append('address', newEmployee.address)
    formData.append('nic', newEmployee.nic)
    formData.append('bday', newEmployee.bday)
    formData.append('is_married', newEmployee.is_married)
    formData.append('contact_num', newEmployee.contact_num)
    formData.append('emergency_contact', newEmployee.emergency_contact)
    formData.append('email', newEmployee.email)
    formData.append('paygrade_id', newEmployee.paygrade_id)
    formData.append('emp_status_id', newEmployee.emp_status_id)
    formData.append('dept_id', 2)
    formData.append('type_id', 3)
    formData.append('job_type_id', 1)
    formData.append('bank_account_num', newEmployee.bank_account_num)

    for (let i = 0; i < dataTypes.length - 18; i++) {
      let column = dataTypes[i + 17].COLUMN_NAME
      formData.append(column, newEmployee[column])
    }

    Axios.post('http://localhost:3001/api/admin/addemployee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

        'x-auth-token': authService.getUserToken(),
      },
    }).then((res) => {
      if (res.data.success) {
        alert('successfully added')
        handleCloseAdd()
        navigate('/admin')
        window.location.reload(false)
      } else {
      }
    })
  }

  const addImage = (e) => {
    e.preventDefault()
    setImgUrl(URL.createObjectURL(newEmployee.file))
    handleClose()
  }

  function formatDate(n){
    if(n< 10){
        return "0" + n;
    }else{
        return n;
    }
}

  function showExtraAttributes(col_name) {
    try {
      const result = dataTypes.filter(
        (dataType) => dataType.COLUMN_NAME === col_name,
      )[0].DATA_TYPE
      let type = 'number'
      if (result === 'varchar') {
        type = 'text'
      }

      return (
        <div className={`${styles['form-field']}`}>
          <input
            id={col_name}
            type={type}
            className={`${styles['input-text']}`}
            value={newEmployee[col_name]}
            onChange={(e) => (newEmployee[col_name] = e.target.value)}
            required
          />
          <label htmlFor={col_name} className={`${styles['label']}`}>
            {col_name}
          </label>
        </div>
      )
    } catch (e) {
      return null
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className={`${styles['admin-container']}`}>
          <div className={`${styles['admin-heading']}`}>
            <h1 className="text-primary">Our Staff</h1>
          </div>
          <div className={`${styles['hrmanager-container']}`}>
            <div className={`${styles['hrmanager-heading']}`}>
              <h1 className="text-primary">HR Manager</h1>
            </div>
            {hrmanager.length === 0 ? (
              <button
                type="button"
                className={`${styles['hrmanager-profile']}`}
                onClick={handleShowAdd}
              >
                <h1>+</h1>
              </button>
            ) : (
              <div className={`${styles['profile']} `}>
                <Link
                  to="/admin/hr-profile"
                  state={hrmanager}
                  style={{ textDecoration: 'none' }}
                >
                  <Profile
                    name={hrmanager.first_name + ' ' + hrmanager.last_name}
                    jobRole={hrmanager.job_type_title}
                    img={hrmanager.profile_picture}
                  />
                </Link>
              </div>
            )}
          </div>
          <div
            className={`${
              hrmanager.length !== 0
                ? styles['employee-container']
                : styles['noemployee-container']
            }`}
          >
            <div className={`${styles['employee-heading']}`}>
              <h1 className="text-primary">Employees</h1>
            </div>
            {employees.length === 0 ? (
              <div className={`${styles['employee-profiles']}`}>
                <div className={`${styles['employee-img-container']}`}>
                  <i className={`${styles['employee-img']} bx bx-user`}></i>
                </div>
                <div className={`${styles['employee-message']}`}>
                  <p>No employees are added yet.</p>
                </div>
              </div>
            ) : (
              <div className={`${styles['profiles']}`}>
                {employees.map((employee) => {
                  if (employee.job_type_title !== 'HR Manager') {
                    return (
                      <div className={`${styles['profile']}`}>
                        <Link
                          to="/admin/emp-profile"
                          state={employee}
                          style={{ textDecoration: 'none' }}
                        >
                          <Profile
                            name={
                              employee.first_name + ' ' + employee.last_name
                            }
                            jobRole={employee.job_type_title}
                            img={employee.profile_picture}
                          />
                        </Link>
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </div>

          {/* modal for adding the HRM */}
          <Modal
            show={show}
            onHide={handleCloseAdd}
            className={`${styles['modal-container']}`}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              style={{ border: '1px white solid', backgroundColor: '#3261fa' }}
            >
              <Modal.Title>
                {' '}
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  Add HR Manager
                </h5>
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={addRecord}>
              <Modal.Body>
                <div className={`${styles['field-container']} row`}>
                  <div className="col">
                    <div className={`${styles['profile-img']}`}>
                      <p style={{ fontWeight: 'bold' }}>Profile Image</p>
                      <hr />
                      {newEmployee.file ? (
                        <img
                          src={imgUrl}
                          className={`${styles['img-container']}`}
                        ></img>
                      ) : (
                        <button
                          className={`${styles['img-container']}`}
                          onClick={handleShow}
                        >
                          {' '}
                           Add Avatar +{' '}
                        </button>
                      )}
                    </div>
                    <div className={`${styles['employee-info']} col-12`}>
                      <p style={{ fontWeight: 'bold' }}>Employee Information</p>
                      <hr />
                      <div className={`${styles['form-field']}`}>
                        <input
                          id="empid"
                          type="text"
                          className={`${styles['input-text']}`}
                          value={newEmployee.emp_id}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              emp_id: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="empid" className={`${styles['label']}`}>
                          Employee ID
                        </label>
                      </div>
                      <div className={`${styles['form-field']}`}>
                        <select
                          id="paygrade"
                          type="text"
                          className={`${styles['input-text']}`}
                          value={newEmployee.paygrade_id}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              paygrade_id: e.target.value,
                            })
                          }
                          required
                        >
                          {payGrades.map(
                            ({ paygrade_id, name, salary }, index) => (
                              <option value={paygrade_id}>{name}</option>
                            ),
                          )}
                        </select>
                        <label for="paygrade" className={`${styles['label']}`}>
                          Paygrade
                        </label>
                      </div>
                      <div className={`${styles['form-field']}`}>
                        <select
                          id="empstatus"
                          type="text"
                          className={`${styles['input-text']}`}
                          value={newEmployee.emp_status_id}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              emp_status_id: e.target.value,
                            })
                          }
                          required
                        >
                          {empStatus.map(({ emp_status_id, name }, index) => (
                            <option value={emp_status_id}>{name}</option>
                          ))}
                        </select>
                        <label for="empstatus" className={`${styles['label']}`}>
                          Employee status
                        </label>
                      </div>

                      <div className={`${styles['form-field']}`}>
                      <input
                        id="bank_account_num"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.bank_account_num}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            bank_account_num: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="bank_account_num" className={`${styles['label']}`}>
                        Bank Account Num{' '}
                      </label>
                    </div>

                      {dataTypes
                        .slice(18)
                        .map((field) => showExtraAttributes(field.COLUMN_NAME))}
                    </div>

                    
                  </div>
                  <div className={`${styles['basic-info']} col`}>
                    <p style={{ fontWeight: 'bold' }}>Basic Information</p>
                    <hr />
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="fname"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.fname}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            fname: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="fname" className={`${styles['label']}`}>
                        First name{' '}
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="mname"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.mname}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            mname: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="mname" className={`${styles['label']}`}>
                        Middle name{' '}
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="lname"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.lname}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            lname: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="lname" className={`${styles['label']}`}>
                        Last name{' '}
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="address"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.address}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            address: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="address" className={`${styles['label']}`}>
                        Address
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="nic"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.nic}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            nic: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="nic" className={`${styles['label']}`}>
                        NIC
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="bday"
                        type="date"
                        className={`${styles['input-text']}`}
                        value={newEmployee.bday}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            bday: e.target.value,
                          })
                        }
                        required
                        min={(new Date().getFullYear()-80)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                        max={(new Date().getFullYear()-16)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                      />
                      <label for="bday" className={`${styles['label']}`}>
                        BirthDay
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <select
                        id="maritial"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.is_married}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            is_married: e.target.value,
                          })
                        }
                        required
                      >
                        <option value={0}>Single</option>
                        <option value={1}>Married</option>
                      </select>
                      <label for="maritial" className={`${styles['label']}`}>
                        Maritial Status
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="contact"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.contact_num}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            contact_num: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="contact" className={`${styles['label']}`}>
                        Contact number
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="econtact"
                        type="text"
                        className={`${styles['input-text']}`}
                        value={newEmployee.emergency_contact}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            emergency_contact: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="econtact" className={`${styles['label']}`}>
                        Emergency contact number
                      </label>
                    </div>
                    <div className={`${styles['form-field']}`}>
                      <input
                        id="email"
                        type="email"
                        className={`${styles['input-text']}`}
                        value={newEmployee.email}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                      <label for="email" className={`${styles['label']}`}>
                        Email
                      </label>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer
                style={{ border: '1px white solid', backgroundColor: '#3261fa' }}
              >
                <button
                  type="button"
                  onClick={handleCloseAdd}
                  className="btn btn-danger"
                  style={{ fontWeight: 'bold'}}
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={addRecord}
                  className="btn btn-light"
                  style={{ fontWeight: 'bolder' }}
                >
                  ADD
                </button>
              </Modal.Footer>
            </form>
          </Modal>

          {/* modal for adding img */}
          <Modal show={showI} onHide={handleClose} backdrop="static" centered style={{'z-index': 100}}>
            <Modal.Header style={{ backgroundColor: '#098dfa' }}>
              <Modal.Title>Upload your image here..</Modal.Title>
            </Modal.Header>
            <form
              onSubmit={addImage}
              encType="multipart/form-data"
              style={{ backgroundColor: '#f5f6fa' }}
              className={`${styles['modal-image']}`}
            >
              <Modal.Body>
                <input
                  type="file"
                  onChange={(e) => {
                    setNewEmployee({ ...newEmployee, file: e.target.files[0] })
                  }}
                  accept=".png,.gif,.jpg,.webp"
                  multiple={false}
                  required
                />
              </Modal.Body>

              <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addImage}
                >
                  Upload
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
