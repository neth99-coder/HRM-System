import React, {useState} from "react";
import {Breadcrumb, BreadcrumbItem,Card, CardBody, Form,FormGroup} from "reactstrap";
import {Link} from "react-router-dom";
import Styles from "./AddNew.module.css";
import { Spinner } from "react-bootstrap";
import styles from "../../RequestPage/RequestPage.module.css";
import { useEffect } from "react";
import Axios from "axios";
import { generateKey } from "fast-key-generator";
import ReactImageUploading from "react-images-uploading";
import authService from "../../../services/auth.service";
import defaultPic from "../../../assets/profile_picture/default.jpg";


function AddNewComponent(props){

    const [isLoading,setIsLoading] = useState(true);
    const [firstName,setFirstName] = useState();
    const [middleName,setMiddleName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [deptID,setDeptID] = useState();
    const [typeID,setTypeID] = useState();
    const [address,setAddress] = useState();
    const [nic,setNic] = useState();
    const [bday,setBday] = useState();
    const [isMarried,setIsMarried] = useState();
    const [contactNum,setContactNum] = useState();
    const [jobType,setJobType] = useState();
    const [emergencyNum,setEmergencyNum] = useState();
    const [paygradeID,setPaygradeID] = useState();
    const [empStatusId,setEmpStatusId] = useState();
    const [empID,setEmpID] = useState(props.empID);
    const [departments,setDepartments] = useState([]);
    const [types,setTypes] = useState([]);
    const [jobs,setJobs] = useState([]);
    const [profilePicture,setProfilePicture] = useState(defaultPic);
    const [status,setStatus] = useState([]);
    const [payGrades,setPayGrades] = useState([]);
    const [employeeIds,setEmployeeIds] = useState([]);
    const [isValid,setIsValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [Image,setImage] = useState();
    const [imageName,setImageName] = useState();
    const [isDpChanged,setIsDpChanged] = useState(false);
    const [employeeNew,setEmployeeNew] = useState({});
    const [changeList,setChangeList] = useState([]);
    const [supervisor,setSupervisor] = useState();
    const [supervisorsList,setSupervisorList] = useState([]);
    const [accountID,setAccountId] = useState();

  useEffect(() => {
    setIsLoading(true);

    const findDepartments = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getDepartments", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setDepartments(res.data.result);
      });
    };
    findDepartments();

    const findTypes = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getTypes", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setTypes(res.data.result);
      });
    };
    findTypes();

      const findJobs = async () => {
          await Axios.get("http://localhost:3001/api/hrManager/getJobTypes", {
              headers: { "x-auth-token": authService.getUserToken() },
          }).then((res) => {
              setJobs(res.data.result);
          });
      };
      findJobs();

    const findStatus = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getStatus", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setStatus(res.data.result);
      });
    };
    findStatus();

    const findPaygrades = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getPaygrades", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setPayGrades(res.data.result);
      });
    };
    findPaygrades();

    const findEmployeeIds = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getEmployeeIds", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setEmployeeIds(res.data.result);
      });
    };
    findEmployeeIds();

      const findSupervisorID = async () => {
          await Axios.get("http://localhost:3001/api/hrManager/getSupervisorId", {
              headers: { "x-auth-token": authService.getUserToken() },
          }).then((res) => {
              setSupervisorList(res.data.result);
          });
      };
      findSupervisorID();

    const GenerateEmpId = async () => {
      const excludeList = [];
      for (let i = 0; i < employeeIds.length; i++) {
        excludeList[i] = employeeIds[i].emp_id;
      }
      const key = generateKey({
        size: 7,
        chartype: "numeric",
        exclude: excludeList,
      });
      setEmpID(key);
    };
    GenerateEmpId();

    setIsLoading(false);
  }, []);

  function validate(emp_id) {
    for (let i = 0; i < employeeIds.length; i++) {
      if (emp_id === employeeIds[i].emp_id) {
        setIsValid(false);
        setErrorMsg("Employee Id already exist!");
        return;
      }
    }
    setIsValid(true);
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "middleName") {
      setMiddleName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "contactNum") {
      setContactNum(value);
    } else if (name === "emergencyNum") {
      setEmergencyNum(value);
    } else if (name === "nic") {
      setNic(value);
    } else if (name === "bday") {
      setBday(value);
    } else if (name === "isMarried") {
      setIsMarried(value);
    } else if (name === "deptID") {
      setDeptID(value);
    } else if (name === "typeID") {
      setTypeID(value);
    } else if (name === "empStatusId") {
      setEmpStatusId(value);
    } else if (name === "paygradeID") {
      setPaygradeID(value);
    } else if (name === "empID") {
      setEmpID(value);
      validate(value);
    }else if(name == "supervisorId"){
        setSupervisor(value);
    }else if(name == "jobID"){
        setJobType(value);
    }else if(name === 'accountID'){
        setAccountId(value);
    }
  }



    async function handleSubmit(event) {
        event.preventDefault();
        const formData = [empID,firstName,middleName,lastName,address,nic,bday,isMarried,contactNum,emergencyNum,email,deptID,paygradeID,empStatusId,typeID,imageName,jobType,accountID];
        for(let j = 0; j < Object.keys(props.employeeFull).length - 18 ; j++){
            const col_name = Object.keys(props.employeeFull)[18+j];
            formData.push(employeeNew[col_name]);
        };
        const formValues = {
            keys: Object.keys(props.employeeFull),
            values: formData,
            supervisor: supervisor,
            emp_id: empID,
            supervisor_id: supervisor
        };
        Axios.post(
            "http://localhost:3001/api/hrManager/addEmployeeTransaction",
            formValues, {
                headers: { "x-auth-token": authService.getUserToken() },
            }
        ).then(async (res) => {
            if (!res.data.success) {
                alert("Error occured !!");
            } else if (isDpChanged) {
                const formData = new FormData();
                formData.append("file", Image);
                formData.append("fileName", imageName);
                await Axios.post("http://localhost:3001/api/hrManager/dpUpload",
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "x-auth-token": authService.getUserToken()
                        }
                    }).then((res) => {
                    if (!res.data.success) {
                        console.log(res);
                    } else {
                        window.open(`/hrmanager/employee/view/${empID}`);
                    }
                });
            } else {
                window.open(`/hrmanager/employee/view/${empID}`);
        }});
    }

    function onImgUpload(imageList,addUpdateIndex){
        setProfilePicture(imageList[0].dataURL);
        setImage(imageList[0].file);
        setImageName(empID + imageList[0].file.name);
        setIsDpChanged(true);
    };

    function showExtraAttributes(col_name){
        try {
            const result = props.dataTypes.filter((dataType)=> dataType.COLUMN_NAME === col_name)[0].DATA_TYPE;
            let type = "number";
            if(result === "varchar"){
                type = "text";
            }

            return(
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <FormGroup>
                        <label htmlFor={col_name}>{col_name}</label>
                        <input type={type}
                               className={Styles["form-control"]}
                               id={col_name}
                               name={col_name}
                               required={true}
                               value={employeeNew[col_name]}
                               placeholder={"Enter " + col_name}
                               onChange={handleInputChangeExtra}/>
                    </FormGroup>
                </div>
            )
        }catch (e){
            return (null);
        }


    }

    function handleInputChangeExtra(event){
        const name = event.target.name;
        const value = event.target.value;
        const employeeTemp = JSON.parse(JSON.stringify(employeeNew));
        employeeTemp[name] = value;
        setEmployeeNew(JSON.parse(JSON.stringify(employeeTemp)));
        changeList.push(name);
    }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles["spinner"]}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className="container">
            <div>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link
                    to="/hrmanager/employee"
                    className={Styles["breadcrumb-link"]}
                  >
                    Employee
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Add New Employee</BreadcrumbItem>
              </Breadcrumb>
              <h1 className="text-primary">New Employee</h1>
              <hr />

              <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className={Styles["account-settings"]}>
                        <div className={Styles["user-profile"]}>
                          <div className={Styles["user-avatar"]}>
                            {/*{"../../../public"+this.state.employee.profile_picture}*/}
                            <img
                              className={Styles["profile-dp"]}
                              src={profilePicture}
                              alt={"Add Profile Picture"}
                            />
                          </div>

                          <div>
                            <ReactImageUploading
                              value={[]}
                              onChange={onImgUpload}
                              maxNumber={1}
                              acceptType={["jpg", "png"]}
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
                                // write your building UI
                                <div className="upload__image-wrapper">
                                  <button
                                    className="btn btn-primary"
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >
                                    Add Image
                                  </button>
                                  &nbsp;
                                  {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                      <img
                                        src={image["data_url"]}
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
                          <div></div>
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
                                className={Styles["form-control"]}
                                id="firstName"
                                name="firstName"
                                required={true}
                                value={firstName}
                                placeholder="Enter first name"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <FormGroup>
                              <label htmlFor="middleName">Middle Name</label>
                              <input
                                type="text"
                                className={Styles["form-control"]}
                                id="middleName"
                                name="middleName"
                                required={true}
                                value={middleName}
                                placeholder="Enter middle name"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <FormGroup>
                              <label htmlFor="lastName">Last Name</label>
                              <input
                                type="text"
                                className={Styles["form-control"]}
                                id="lastName"
                                name="lastName"
                                required={true}
                                value={lastName}
                                placeholder="Enter last name"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                className={Styles["form-control"]}
                                id="address"
                                name="address"
                                required={true}
                                value={address}
                                placeholder="Enter Address"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                className={Styles["form-control"]}
                                id="email"
                                name="email"
                                required={true}
                                value={email}
                                placeholder="Enter Email Address"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="contactNum">Contact Number</label>
                              <input
                                type="tel"
                                className={Styles["form-control"]}
                                id="contactNum"
                                name="contactNum"
                                pattern="[0-9]{9,11}"
                                required={true}
                                value={contactNum}
                                placeholder="Enter Contact Number"
                                onChange={handleInputChange}
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
                                className={Styles["form-control"]}
                                id="emergencyNum"
                                name="emergencyNum"
                                pattern="[0-9]{9,11}"
                                required={true}
                                value={emergencyNum}
                                placeholder="Enter Emergency Number"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="nic">NIC</label>
                              <input
                                type="text"
                                className={Styles["form-control"]}
                                id="nic"
                                name="nic"
                                required={true}
                                value={nic}
                                placeholder="Enter NIC Number"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="bday">Birthday</label>
                              <input
                                type="date"
                                className={Styles["form-control"]}
                                id="bday"
                                name="bday"
                                required={true}
                                value={bday}
                                placeholder="Select Birthday"
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="isMarried">Marital Status</label>
                              <select
                                className={Styles["form-control"]}
                                id="isMarried"
                                name="isMarried"
                                placeholder="Select Marital Status"
                                required={true}
                                value={isMarried}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden={true}>
                                  Select Marital Status
                                </option>
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
                                className={Styles["form-control"]}
                                id="empID"
                                name="empID"
                                required={true}
                                value={empID}
                                pattern="[0-9]{7}"
                                placeholder="Enter Employee ID"
                                onChange={handleInputChange}
                              />
                              <div
                                className={Styles["warning"]}
                                hidden={isValid}
                              >
                                <span className="fa fa-warning"></span>
                                <span className={Styles["warning-msg"]}>
                                  {errorMsg}
                                </span>
                              </div>
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="deptID">Department</label>
                              <select
                                className={Styles["form-control"]}
                                id="deptID"
                                name="deptID"
                                placeholder="Select Department"
                                required={true}
                                value={deptID}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden={true}>
                                  Select Department
                                </option>
                                {departments.map(({ dept_id, name }, index) => (
                                  <option value={dept_id}>{name}</option>
                                ))}
                              </select>
                            </FormGroup>
                          </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <FormGroup>
                                    <label htmlFor="typeID">Employee Type</label>
                                    <select
                                        className={Styles["form-control"]}
                                        id="typeID"
                                        name="typeID"
                                        placeholder="Select Employee Type"
                                        required={true}
                                        value={typeID}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" hidden={true}>Select Employee Type</option>
                                        {types.filter((type) => type.type_id !== 3 && type.type_id !== 4).map(({ type_id, type_name }, index) => (
                                            <option value={type_id}>{type_name}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <FormGroup>
                                    <label htmlFor="jobID">Designation</label>
                                    <select
                                        className={Styles["form-control"]}
                                        id="jobID"
                                        name="jobID"
                                        placeholder="Select Designation"
                                        required={true}
                                        value={jobType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" hidden={true}>Select Designation</option>
                                        {jobs.filter((job) => job.job_type_title !== "HR Manager").map(({ job_type_id, job_type_title }, index) => (
                                            <option value={job_type_id}>{job_type_title}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="empStatusId">
                                Employee status
                              </label>
                              <select
                                className={Styles["form-control"]}
                                id="empStatusId"
                                name="empStatusId"
                                placeholder="Select Status"
                                required={true}
                                value={empStatusId}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden={true}>
                                  Select Employee Status
                                </option>
                                {status.map(
                                  ({ emp_status_id, name }, index) => (
                                    <option value={emp_status_id}>
                                      {name}
                                    </option>
                                  )
                                )}
                              </select>
                            </FormGroup>
                          </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="paygradeID">Pay-Grade</label>
                                                            <select
                                                                className={Styles["form-control"]}
                                                                id="paygradeID"
                                                                name="paygradeID"
                                                                placeholder="Select pay-grade"
                                                                required={true}
                                                                value={paygradeID}
                                                                onChange={handleInputChange}>
                                                                <option value="" hidden={true}>Select Pay-Grade</option>
                                                                {payGrades.map(({ paygrade_id, name }, index) => <option value={paygrade_id} >{name}</option>)}
                                                            </select>
                                                        </FormGroup>
                                                    </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <FormGroup>
                                    <label htmlFor="supervisorId">Supervisor</label>
                                    <select
                                        className={Styles["form-control"]}
                                        id="supervisorId"
                                        name="supervisorId"
                                        placeholder="Select supervisor"
                                        required={true}
                                        value={supervisor}
                                        onChange={handleInputChange}>
                                        <option value="" hidden={true}>Select Supervisor</option>
                                        {supervisorsList.map(({ emp_id, first_name,last_name }, index) => <option value={emp_id} >{emp_id + " - " + first_name + " " + last_name}</option>)}
                                    </select>
                                </FormGroup>
                            </div>
                        </div>

                          <div className="row gutters">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                  <h6 className="mt-3 mb-2 text-primary">
                                      Payment Details
                                  </h6>
                              </div>

                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <FormGroup>
                                      <label htmlFor="accountID">Bank Account Number</label>
                                      <input
                                          type="text"
                                          className={Styles["form-control"]}
                                          id="accountID"
                                          name="accountID"
                                          required={true}
                                          value={accountID}
                                          placeholder="Enter Bank Account ID"
                                          onChange={handleInputChange}
                                      />
                                  </FormGroup>
                              </div>

                          </div>

                          <div className="row gutters">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                  <h6 className="mt-3 mb-2 text-primary">
                                      Additional Details
                                  </h6>
                              </div>
                              {Object.keys(props.employeeFull).slice(18).map(showExtraAttributes)}
                          </div>

                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                              <Link to={"/hrmanager/employee"}>
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
                                disabled={!isValid}
                              >
                                Add
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
  );
}

export default AddNewComponent;
