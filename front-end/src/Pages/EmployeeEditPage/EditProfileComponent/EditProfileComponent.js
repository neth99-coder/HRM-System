import React, {Component, useState} from "react";
import {Breadcrumb, BreadcrumbItem,Card, CardBody, Form,FormGroup} from "reactstrap";
import {Link} from "react-router-dom";
import Styles from "./EditProfie.module.css";
import { Spinner } from "react-bootstrap";
import styles from "../../RequestPage/RequestPage.module.css";
import { useEffect } from "react";
import Axios from "axios";
import ReactImageUploading from "react-images-uploading";
import authService from "../../../services/auth.service";
import defaultPic from "../../../assets/profile_picture/default.jpg";

function EditProfile(props){

    const [isLoading,setIsLoading] = useState(true);
    const [employee,setEmployee] = useState();
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
    const [emergencyNum,setEmergencyNum] = useState();
    const [paygradeID,setPaygradeID] = useState();
    const [empStatusId,setEmpStatusId] = useState();
    const [empID,setEmpID] = useState(props.empID);
    const [departments,setDepartments] = useState([]);
    const [types,setTypes] = useState([]);
    const [profilePicture,setProfilePicture] = useState();
    const [status,setStatus] = useState([]);
    const [payGrades,setPayGrades] = useState([]);
    const [orginalFirstName,setOrginalFirstName] = useState();
    const [orginalLastName,setOrginalLastName] = useState();
    const [employeeDepartment,setEmployeeDepartment] = useState({dept_id:'',name:'',building:'',description:''});
    const [employeeType,setEmployeeType] = useState({type_id:'',type_name:''});
    const [Image,setImage] = useState({});
    const [imageName,setImageName] = useState();
    const [isDpChanged,setIsDpChanged] = useState(false);
    const [employeeNew,setEmployeeNew] = useState({});
    const [changeList,setChangeList] = useState([]);

  useEffect(() => {
    setIsLoading(true);

        const findEmployee = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getemployee/"+ authService.getUserID(),{
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(
                (res) => {
                    setEmployee(res.data.result[0]);
                    setFirstName(res.data.result[0].first_name);
                    setLastName(res.data.result[0].last_name);
                    setOrginalFirstName(res.data.result[0].first_name);
                    setOrginalLastName(res.data.result[0].last_name);
                    setMiddleName(res.data.result[0].middle_name);
                    setEmail(res.data.result[0].email);
                    setDeptID(res.data.result[0].dept_id);
                    setTypeID(res.data.result[0].type_id);
                    setAddress(res.data.result[0].address);
                    setNic(res.data.result[0].nic);
                    setBday(res.data.result[0].bday.substring(0,10));
                    setIsMarried(res.data.result[0].is_married);
                    setContactNum(res.data.result[0].contact_num);
                    setEmergencyNum(res.data.result[0].emergency_contact);
                    setPaygradeID(res.data.result[0].paygrade_id);
                    setEmpStatusId(res.data.result[0].emp_status_id);
                    setImageName(res.data.result[0].profile_picture);
                    if(res.data.result[0].profile_picture !== undefined && res.data.result[0].profile_picture !== ""){
                        setProfilePicture("http://localhost:3001/profilePictures/" + res.data.result[0].profile_picture);
                    }else{
                        setProfilePicture(defaultPic);
                    }
                }
            );
        };
        findEmployee();

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

    const findEmployeeDepartment = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getemployeeDepartment/" +
          authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        setEmployeeDepartment(res.data.result[0]);
      });
    };
    findEmployeeDepartment();

    const findEmployeeType = async () => {
      await Axios.get(
        "http://localhost:3001/api/hrManager/getemployeeType/" +
          authService.getUserID(),
        {
          headers: { "x-auth-token": authService.getUserToken() },
        }
      ).then((res) => {
        setEmployeeType(res.data.result[0]);
      });
    };
    findEmployeeType();

    setIsLoading(false);
  }, []);


    function handleInputChange(event){
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
    }
  }


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = [firstName,middleName,lastName,address,nic,bday,isMarried,contactNum,emergencyNum,email,deptID,paygradeID,empStatusId,typeID,imageName];
        for(let j = 0; j < Object.keys(props.employeeFull).length - 16 ; j++){
            const col_name = Object.keys(props.employeeFull)[16+j];
            if(changeList.includes(col_name)){
                formData.push(employeeNew[col_name]);
            }else{
                formData.push(props.employeeFull[col_name]);
            }
        };
        formData.push(empID);
        const formValues = {
            keys: Object.keys(props.employeeFull),
            values: formData
        };


        console.log(formData, Object.keys(props.employeeFull));

        Axios.post(
            "http://localhost:3001/api/hrManager/updateEmployee",
            formValues,        {
                headers: { "x-auth-token": authService.getUserToken() },
            }
        ).then(async (res) => {
            if (!res.data.success) {
                alert("Error occured !!");
            } else if(isDpChanged) {
                const formData = new FormData();
                formData.append("file", Image);
                formData.append("fileName", imageName);
                await Axios.post("http://localhost:3001/api/hrManager/dpUpload",
                    formData,{headers: {
                    'Content-Type': 'multipart/form-data',
                            "x-auth-token": authService.getUserToken()
                }}).then((res)=>{
                    if (!res.data.success) {
                        console.log(res);
                    } else {
                        window.open(`/hrmanager/employee/view/${empID}`);
                    }
                });
            }else{
                window.open(`/hrmanager/employee/view/${empID}`);
            }
        });
    }

    function onImgUpload(imageList,addUpdateIndex){
        setProfilePicture(imageList[0].dataURL);
        setImage(imageList[0].file);
        setImageName(empID + imageList[0].file.name);
        setIsDpChanged(true);
    };


    function showExtraAttributes(col_name){
        const result = props.dataTypes.filter((dataType)=> dataType.COLUMN_NAME === col_name)[0].DATA_TYPE;
        let type = "number";
        if(result === "varchar"){
            type = "text";
        }
        if(!changeList.includes(col_name)){
            return(
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                    <FormGroup>
                        <label htmlFor={col_name}>{col_name}</label>
                        <input type={type}
                               className={Styles["form-control"]}
                               id={col_name}
                               name={col_name}
                               required={true}
                               value={props.employeeFull[col_name]}
                               placeholder={"Enter " + col_name}
                               onChange={handleInputChangeExtra}/>
                    </FormGroup>
                </div>
            )
        }else{
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
                <BreadcrumbItem>
                  <Link
                    to={`/hrmanager/employee/view/${empID}`}
                    className={Styles["breadcrumb-link"]}
                  >
                    {orginalFirstName + " " + orginalLastName}
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
                      <div className={Styles["account-settings"]}>
                        <div className={Styles["user-profile"]}>
                          <div className={Styles["user-avatar"]}>
                            {/*{"../../../public"+this.state.employee.profile_picture}*/}
                            <img
                              className={Styles["profile-dp"]}
                              src={profilePicture}
                              alt={orginalFirstName + " " + orginalLastName}
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
                                    Change Image
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

                          <h5 className="user-name">
                            {orginalFirstName + " " + orginalLastName}
                          </h5>
                          <h6 className="user-email">{email}</h6>
                        </div>
                        <div className={Styles["about"]}>
                          <h5>About</h5>
                          <p>
                            {employeeType.type_name} - {employeeDepartment.name}
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
                                placeholder="Enter Employee ID"
                                readOnly={true}
                                onChange={handleInputChange}
                              />
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
                                {departments.map(({ dept_id, name }, index) => (
                                  <option value={dept_id}>{name}</option>
                                ))}
                              </select>
                            </FormGroup>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <FormGroup>
                              <label htmlFor="typeID">Designation</label>
                              <select
                                className={Styles["form-control"]}
                                id="typeID"
                                name="typeID"
                                placeholder="Select Designation"
                                required={true}
                                value={typeID}
                                onChange={handleInputChange}
                              >
                                {types.map(({ type_id, type_name }, index) => (
                                  <option value={type_id}>{type_name}</option>
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
                                                                {payGrades.map(({ paygrade_id, name }, index) => <option value={paygrade_id} >{name}</option>)}
                                                            </select>
                                                        </FormGroup>
                                                    </div>

                                                    <div>
                                                        {Object.keys(props.employeeFull).slice(16).map(showExtraAttributes)}
                                                    </div>

                                                </div>

                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right">
                              <Link to={"/hrmanager/employee/view/" + empID}>
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
  );
}

export default EditProfile;
