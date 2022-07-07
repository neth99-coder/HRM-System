import { React, useState, useEffect } from 'react'
import styles from './index.module.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './ProfileComponent/profile.js'
import { Modal, Spinner } from 'react-bootstrap'
import {generateKey} from "fast-key-generator";
import authService from "../../services/auth.service";

const Index = (props) => {
  const [employees, setEmployees] = useState([]);
  const [hrmanager, setHrmanager] = useState([]);

  const navigate = useNavigate();

  const [newEmployee, setNewEmployee] = useState({
    emp_id: "",
    file: "",
    fname: "",
    mname: "",
    lname: "",
    address: "",
    nic: "",
    bday: "",
    is_married: "",
    contact_num: "",
    emergency_contact: "",
    email: "",
    paygrade_id: "",
    emp_status_id: "",
  });
  const [employeeIds, setEmployeeIds] = useState([]);

  const [imgUrl, setImgUrl] = useState("");

  const [show, setShow] = useState(false);
  const handleCloseAdd = () => setShow(false);
  const handleShowAdd = () => setShow(true);

  const [showI, setShowI] = useState(false);
  const handleClose = () => setShowI(false);
  const handleShow = () => setShowI(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get('http://localhost:3001/api/employee/getemployeetypes',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then(
      (res) => {
        res.data.result.map((employee) => {
          if (employee.type_name === "HR Manager") {
            setHrmanager(employee);
          }
        })
        setEmployees(res.data.result)
      },
    )

    Axios.get('http://localhost:3001/api/hrManager/getEmployeeIds',{
      headers: { "x-auth-token": authService.getUserToken() },
    }).then(
      (res) => {
        setEmployeeIds(res.data.result);
      }
    );

    const GenerateEmpId = () => {
      const excludeList = [];
      for (let i = 0; i < employeeIds.length; i++) {
        excludeList[i] = employeeIds[i].emp_id;
      }
      return generateKey({
        size: 7,
        chartype: "numeric",
        exclude: excludeList,
      });
    };

    setNewEmployee({ ...newEmployee,emp_id:GenerateEmpId()})
    setIsLoading(false);
  }, [])

  const addRecord = (e) => {
    // e.preventDefault()
    const formData = new FormData();

    formData.append("emp_id", newEmployee.emp_id);
    formData.append("file", newEmployee.file);
    formData.append("fname", newEmployee.fname);
    formData.append("mname", newEmployee.mname);
    formData.append("lname", newEmployee.lname);
    formData.append("address", newEmployee.address);
    formData.append("nic", newEmployee.nic);
    formData.append("bday", newEmployee.bday);
    formData.append("is_married", newEmployee.is_married);
    formData.append("contact_num", newEmployee.contact_num);
    formData.append("emergency_contact", newEmployee.emergency_contact);
    formData.append("email", newEmployee.email);
    formData.append("paygrade_id", newEmployee.paygrade_id);
    formData.append("emp_status_id", newEmployee.emp_status_id);
    formData.append("dept_id", 1);
    formData.append("type_id", 5);

    Axios.post("http://localhost:3001/api/employee/addemployee", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "x-auth-token": authService.getUserToken()
      },
    }).then((res) => {
      if (res.data.success) {
        alert("successfully added");
        handleCloseAdd();
        navigate("/admin/home");
      } else {
      }
    });
  };

  const addImage = (e) => {
    e.preventDefault();
    setImgUrl(URL.createObjectURL(newEmployee.file));
    handleClose();
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles["spinner"]}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className={`${styles["admin-container"]}`}>
            <div className={`${styles["admin-heading"]}`}>
              <h1 className="text-primary">Our Staff</h1>
            </div>
            <div className={`${styles["hrmanager-container"]}`}>
              <div className={`${styles["hrmanager-heading"]}`}>
                <h1 className="text-primary">HR Manager</h1>
              </div>
              {hrmanager.length === 0 ? (
                <button
                  type="button"
                  className={`${styles["hrmanager-profile"]}`}
                  onClick={handleShowAdd}
                >
                  <h1>+</h1>
                </button>
              ) : (
                <div className={`${styles["profile"]} `}>
                  <Link
                    to="/admin/hr-profile"
                    state={hrmanager}
                    style={{ textDecoration: "none" }}
                  >
                    <Profile
                      name={hrmanager.first_name + " " + hrmanager.last_name}
                      jobRole={hrmanager.type_name}
                      img={hrmanager.profile_picture}
                    />
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`${
                hrmanager.length !== 0
                  ? styles["employee-container"]
                  : styles["noemployee-container"]
              }`}
            >
              <div className={`${styles["employee-heading"]}`}>
                <h1 className="text-primary">Employees</h1>
              </div>
              {employees.length === 0 ? (
                <div className={`${styles["employee-profiles"]}`}>
                  <div className={`${styles["employee-img-container"]}`}>
                    <i className={`${styles["employee-img"]} bx bx-user`}></i>
                  </div>
                  <div className={`${styles["employee-message"]}`}>
                    <p>No employees are added yet.</p>
                  </div>
                </div>
              ) : (
                <div className={`${styles["profiles"]}`}>
                  {employees.map((employee) => {
                    if (employee.type_name !== "HR Manager") {
                      return (
                        <div className={`${styles["profile"]}`}>
                          <Link
                            to="/admin/emp-profile"
                            state={employee}
                            style={{ textDecoration: "none" }}
                          >
                            <Profile
                              name={
                                employee.first_name + " " + employee.last_name
                              }
                              jobRole={employee.type_name}
                              img={employee.profile_picture}
                            />
                          </Link>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>

            {/* modal for adding the HRM */}
            <Modal
              show={show}
              onHide={handleCloseAdd}
              className={`${styles["modal-container"]}`}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header
                closeButton
                style={{ border: "1px white solid", backgroundColor: "black" }}
              >
                <Modal.Title>
                  {" "}
                  <h5
                    className="modal-title"
                    id="exampleModalLongTitle"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Add HR Manager
                  </h5>
                </Modal.Title>
              </Modal.Header>
              <form onSubmit={addRecord}>
                <Modal.Body>
                  <div className={`${styles["field-container"]} row`}>
                    <div className="col">
                      <div className={`${styles["profile-img"]}`}>
                        <p style={{ fontWeight: "bold" }}>Profile Image</p>
                        <hr />
                        {newEmployee.file ? (
                          <img
                            src={imgUrl}
                            className={`${styles["img-container"]}`}
                            alt="Poops"
                          ></img>
                        ) : (
                          <button
                            className={`${styles["img-container"]}`}
                            onClick={handleShow}
                          >
                            {" "}
                            +{" "}
                          </button>
                        )}
                      </div>
                      <div className={`${styles["employee-info"]} col-12`}>
                        <p style={{ fontWeight: "bold" }}>
                          Employee Information
                        </p>
                        <hr />
                        <div className={`${styles["form-field"]}`}>
                          <input
                            id="empid"
                            type="text"
                            className={`${styles["input-text"]}`}
                            value={newEmployee.emp_id}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                emp_id: e.target.value,
                              })
                            }
                            required
                          />
                          <label for="empid" className={`${styles["label"]}`}>
                            Employee ID
                          </label>
                        </div>
                        <div className={`${styles["form-field"]}`}>
                          <select
                            id="paygrade"
                            type="text"
                            className={`${styles["input-text"]}`}
                            value={newEmployee.paygrade_id}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                paygrade_id: e.target.value,
                              })
                            }
                            required
                          >
                            {props.paygrades.map(
                              ({ paygrade_id, name, salary }, index) => (
                                <option value={paygrade_id}>{name}</option>
                              )
                            )}
                          </select>
                          <label
                            for="paygrade"
                            className={`${styles["label"]}`}
                          >
                            Paygrade
                          </label>
                        </div>
                        <div className={`${styles["form-field"]}`}>
                          <select
                            id="empstatus"
                            type="text"
                            className={`${styles["input-text"]}`}
                            value={newEmployee.emp_status_id}
                            onChange={(e) =>
                              setNewEmployee({
                                ...newEmployee,
                                emp_status_id: e.target.value,
                              })
                            }
                            required
                          >
                            {props.status.map(
                              ({ emp_status_id, name }, index) => (
                                <option value={emp_status_id}>{name}</option>
                              )
                            )}
                          </select>
                          <label
                            for="empstatus"
                            className={`${styles["label"]}`}
                          >
                            Employee status
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["basic-info"]} col`}>
                      <p style={{ fontWeight: "bold" }}>Basic Information</p>
                      <hr />
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="fname"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.fname}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              fname: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="fname" className={`${styles["label"]}`}>
                          First name{" "}
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="mname"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.mname}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              mname: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="mname" className={`${styles["label"]}`}>
                          Middle name{" "}
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="lname"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.lname}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              lname: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="lname" className={`${styles["label"]}`}>
                          Last name{" "}
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="address"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.address}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              address: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="address" className={`${styles["label"]}`}>
                          Address
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="nic"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.nic}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              nic: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="nic" className={`${styles["label"]}`}>
                          NIC
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="bday"
                          type="date"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.bday}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              bday: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="bday" className={`${styles["label"]}`}>
                          BirthDay
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <select
                          id="maritial"
                          type="text"
                          className={`${styles["input-text"]}`}
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
                        <label for="maritial" className={`${styles["label"]}`}>
                          Maritial Status
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="contact"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.contact_num}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              contact_num: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="contact" className={`${styles["label"]}`}>
                          Contact number
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="econtact"
                          type="text"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.emergency_contact}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              emergency_contact: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="econtact" className={`${styles["label"]}`}>
                          Emergency contact number
                        </label>
                      </div>
                      <div className={`${styles["form-field"]}`}>
                        <input
                          id="email"
                          type="email"
                          className={`${styles["input-text"]}`}
                          value={newEmployee.email}
                          onChange={(e) =>
                            setNewEmployee({
                              ...newEmployee,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                        <label for="email" className={`${styles["label"]}`}>
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer
                  style={{
                    border: "1px white solid",
                    backgroundColor: "black",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCloseAdd}
                    className="btn btn-secondary"
                    style={{ fontWeight: "bold" }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={addRecord}
                    className="btn btn-light"
                    style={{ fontWeight: "bolder" }}
                  >
                    ADD
                  </button>
                </Modal.Footer>
              </form>
            </Modal>

            {/* modal for adding img */}
            <Modal show={showI} onHide={handleClose} centered>
              <Modal.Header style={{ backgroundColor: "#f5f6fa" }}>
                <Modal.Title>Upload your image here..</Modal.Title>
              </Modal.Header>
              <form
                onSubmit={addImage}
                encType="multipart/form-data"
                style={{ backgroundColor: "#f5f6fa" }}
                className={`${styles["modal-image"]}`}
              >
                <Modal.Body>
                  <input
                    type="file"
                    onChange={(e) => {
                      setNewEmployee({
                        ...newEmployee,
                        file: e.target.files[0],
                      });
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
                    className="btn btn-light"
                    onClick={addImage}
                  >
                    Upload
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
