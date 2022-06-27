import { React, useState, useEffect } from 'react'
import styles from './adminFront.module.css'
import Axios from 'axios'
import Profile from '../Components/Profile/profile.js'
import { Form, Modal } from 'react-bootstrap'

const AdminFront = () => {
  const [employees, setEmployees] = useState([])
  const [hrmanager, setHrmanager] = useState([])
  const [emp_id, setemp_id] = useState('')
  const [empImg, setempImg] = useState('')
  const [imgUrl , setImgUrl] = useState('')
  const [fname, setfname] = useState('')
  const [mname, setmname] = useState('')
  const [lname, setlname] = useState('')
  const [address, setaddress] = useState('')
  const [nic, setnic] = useState('')
  const [bday, setbday] = useState('')
  const [is_married, setis_married] = useState('')
  const [contact_num, setcontact_num] = useState('')
  const [emergency_contact, setemergency_contact] = useState('')
  const [email, setemail] = useState('')
  const [paygrade_id, setpaygrade_id] = useState('')
  const [emp_status_id, setemp_status_id] = useState('')

  const [show, setShow] = useState(false)
  const handleCloseAdd = () => setShow(false)
  const handleShowAdd = () => setShow(true)

  const [showI, setShowI] = useState(false)
  const handleClose = () => setShowI(false)
  const handleShow = () => setShowI(true)

  useEffect(() => {
    Axios.get('http://localhost:3001/api/employee/getemployeetypes').then(
      (res) => {
        res.data.result.map((employee) => {
          if (employee.type_name === 'HR Manager') {
            setHrmanager(employee)
          }
        })
        setEmployees(res.data.result)
      },
    )
  }, [])

  const addRecord = (e) => {
    // e.preventDefault()
    let data = {
      emp_id: emp_id,
      emp_img:empImg,
      fname: fname,
      mname: mname,
      lname: lname,
      address: address,
      nic: nic,
      bday: bday,
      is_married: is_married,
      contact_num: contact_num,
      emergency_contact: emergency_contact,
      email: email,
      paygrade_id: paygrade_id,
      emp_status_id: emp_status_id,
      dept_id: 1,
      type_id: 5,
    }
    Axios.post('http://localhost:3001/api/employee/addemployee', data).then(
      (res) => {
        console.log(res.data)
        if (res.data.success) {
          alert('successfully added')
        } else {
          alert('a fail')
        }
      },
    )
  }

  const addImage = (e) => {
    e.preventDefault()
    setImgUrl(URL.createObjectURL(empImg))
    setempImg(empImg.name)
    handleClose()
  }

  return (
    <div className={`${styles['admin-container']}`}>
      <div className={`${styles['admin-heading']}`}>
        <h1>Our Staff</h1>
      </div>
      <div className={`${styles['hrmanager-container']}`}>
        <div className={`${styles['hrmanager-heading']}`}>
          <h1>HR Manager</h1>
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
            <Profile
              name={hrmanager.first_name + ' ' + hrmanager.last_name}
              jobRole={hrmanager.type_name}
              img = {hrmanager.emp_img}
            />
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
          <h1>Employees</h1>
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
              if (employee.type_name !== 'HR Manager') {
                return (
                  <div className={`${styles['profile']}`}>
                    <Profile
                      name={employee.first_name + ' ' + employee.last_name}
                      jobRole={employee.type_name}
                    />
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
          style={{ border: '1px white solid', backgroundColor: 'black' }}
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
        <Form onSubmit={addRecord}>
          <Modal.Body>
            <div className={`${styles['field-container']} row`}>
              <div className="col">
                <div className={`${styles['profile-img']}`}>
                  <p style={{ fontWeight: 'bold' }}>Profile Image</p>
                  <hr />
                  {empImg?(
                      <img src={imgUrl} className={`${styles['img-container']}`}></img>
                  ):(
                    <button
                    className={`${styles['img-container']}`}
                    onClick={handleShow}
                  >
                    {' '}
                    +{' '}
                  </button>
                  )}                  
                </div>
                <div className={`${styles['employee-info']} col-12`}>
                  <p style={{ fontWeight: 'bold' }}>Employee Information</p>
                  <hr />
                  <div className={`${styles['form-field']}`}>
                    <Form.Control
                      id="empid"
                      type="text"
                      className={`${styles['input-text']}`}
                      value={emp_id}
                      onChange={(e) => setemp_id(e.target.value)}
                      required
                    />
                    <label for="empid" className={`${styles['label']}`}>
                      Employee ID
                    </label>
                  </div>
                  <div className={`${styles['form-field']}`}>
                    <Form.Control
                      id="paygrade"
                      type="text"
                      className={`${styles['input-text']}`}
                      value={paygrade_id}
                      onChange={(e) => setpaygrade_id(e.target.value)}
                      required
                    />
                    <label for="paygrade" className={`${styles['label']}`}>
                      Paygrade
                    </label>
                  </div>
                  <div className={`${styles['form-field']}`}>
                    <Form.Control
                      id="empstatus"
                      type="text"
                      className={`${styles['input-text']}`}
                      value={emp_status_id}
                      onChange={(e) => setemp_status_id(e.target.value)}
                      required
                    />
                    <label for="empstatus" className={`${styles['label']}`}>
                      Employee status
                    </label>
                  </div>
                </div>
              </div>
              <div className={`${styles['basic-info']} col`}>
                <p style={{ fontWeight: 'bold' }}>Basic Information</p>
                <hr />
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="fname"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                    required
                  />
                  <label for="fname" className={`${styles['label']}`}>
                    First name{' '}
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="mname"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={mname}
                    onChange={(e) => setmname(e.target.value)}
                    required
                  />
                  <label for="mname" className={`${styles['label']}`}>
                    Middle name{' '}
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="lname"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                    required
                  />
                  <label for="lname" className={`${styles['label']}`}>
                    Last name{' '}
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="address"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    required
                  />
                  <label for="address" className={`${styles['label']}`}>
                    Address
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="nic"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={nic}
                    onChange={(e) => setnic(e.target.value)}
                    required
                  />
                  <label for="nic" className={`${styles['label']}`}>
                    NIC
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="bday"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={bday}
                    onChange={(e) => setbday(e.target.value)}
                    required
                  />
                  <label for="bday" className={`${styles['label']}`}>
                    BirthDay
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="maritial"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={is_married}
                    onChange={(e) => setis_married(e.target.value)}
                    required
                  />
                  <label for="maritial" className={`${styles['label']}`}>
                    Maritial Status
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="contact"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={contact_num}
                    onChange={(e) => setcontact_num(e.target.value)}
                    required
                  />
                  <label for="contact" className={`${styles['label']}`}>
                    Contact number
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="econtact"
                    type="text"
                    className={`${styles['input-text']}`}
                    value={emergency_contact}
                    onChange={(e) => setemergency_contact(e.target.value)}
                    required
                  />
                  <label for="econtact" className={`${styles['label']}`}>
                    Emergency contact number
                  </label>
                </div>
                <div className={`${styles['form-field']}`}>
                  <Form.Control
                    id="email"
                    type="email"
                    className={`${styles['input-text']}`}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
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
            style={{ border: '1px white solid', backgroundColor: 'black' }}
          >
            <button
              type="button"
              onClick={handleCloseAdd}
              className="btn btn-secondary"
              style={{ fontWeight: 'bold' }}
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
        </Form>
      </Modal>

      {/* modal for adding img */}
      <Modal show={showI} onHide={handleClose} centered >
        <Modal.Header style={{backgroundColor:"black"}}>
          <Modal.Title style={{color:"white"}}>Upload your image here..</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addImage} enctype="multipart/form-data" style={{backgroundColor:"black"}}>
        <Modal.Body>
         
            <Form.Control
              type="file"
              onChange={(e)=>{setempImg(e.target.files[0])}}
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
              className="btn btn-light"
              onClick={addImage}
            >
              Upload
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminFront
