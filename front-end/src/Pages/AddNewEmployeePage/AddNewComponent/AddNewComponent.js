import React, {useState} from "react";
import {Breadcrumb, BreadcrumbItem,Card, CardBody, Form,FormGroup,Label,Col,Input,FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";
import Styles from "./AddNew.module.css";
import {Spinner} from "react-bootstrap";
import styles from "../../RequestPage/RequestPage.module.css";
import {useEffect} from "react";
import Axios from "axios";
import {generateKey} from "fast-key-generator";

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
    const [emergencyNum,setEmergencyNum] = useState();
    const [paygradeID,setPaygradeID] = useState();
    const [empStatusId,setEmpStatusId] = useState();
    const [empID,setEmpID] = useState(props.empID);
    const [departments,setDepartments] = useState([]);
    const [types,setTypes] = useState([]);
    const [profilePicture,setProfilePicture] = useState();
    const [status,setStatus] = useState([]);
    const [payGrades,setPayGrades] = useState([]);
    const [employeeIds,setEmployeeIds] = useState([]);

    useEffect(()=>{
        setIsLoading(true);

        const findDepartments = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getDepartments").then(
                (res) => {
                    setDepartments(res.data.result);
                }
            );
        };
        findDepartments();

        const findTypes = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getTypes").then(
                (res) => {
                    setTypes(res.data.result);
                });
        };
        findTypes();

        const findStatus = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getStatus").then(
                (res) => {
                    setStatus(res.data.result);
                }
            );
        };
        findStatus();

        const findPaygrades = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getPaygrades").then(
                (res) => {
                    setPayGrades(res.data.result);
                }
            );
        };
        findPaygrades();

        const findEmployeeIds = async () => {
            await Axios.get("http://localhost:3001/api/hrmanager/getEmployeeIds").then(
                (res) => {
                    setEmployeeIds(res.data.result);
                }
            );
        };
        findEmployeeIds();

        const GenerateEmpId = async () => {
            const excludeList = []
            for(let i = 0; i < employeeIds.length ; i++){
                excludeList[i] = employeeIds[i].emp_id;

            }
            const key = generateKey({
                size: 7,
                chartype: 'numeric',
                exclude: excludeList
            });
            setEmpID(key);

        };
        GenerateEmpId();

        setIsLoading(false);
    },[]);

    //         employeeDepartment: this.props.departments.filter((dept)=>dept.dept_id === parseInt(this.props.employee.dept_id))[0],
    //         employeeType: this.props.departments.filter((type)=>type.type_id === parseInt(this.props.employee.type_id))[0],


    function handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "firstName"){
            setFirstName(value);
        }else if(name === "middleName"){
            setMiddleName(value);
        }else if(name === 'lastName'){
            setLastName(value);
        }else if(name === "address"){
            setAddress(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "contactNum"){
            setContactNum(value);
        }else if(name === "emergencyNum"){
            setEmergencyNum(value);
        }else if(name === "nic"){
            setNic(value);
        }else if(name === "bday"){
            setBday(value);
        }else if(name === "isMarried"){
            setIsMarried(value);
        }else if(name === "deptID"){
            setDeptID(value);
        }else if(name === "typeID"){
            setTypeID(value);
        }else if(name === "empStatusId"){
            setEmpStatusId(value);
        }else if(name === "paygradeID"){
            setPaygradeID(value);
        }
    }

    async function delay(delayInms) {
        return new Promise(resolve  => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    }


    async function handleSubmit(event) {
        event.preventDefault();
        const formValues = {
            address: address,
            bday: bday,
            contact_num: contactNum,
            dept_id: deptID,
            email: email,
            emergency_contact: emergencyNum,
            emp_status_id: empStatusId,
            first_name: firstName,
            is_married: isMarried,
            last_name: lastName,
            middle_name: middleName,
            nic: nic,
            paygrade_id: paygradeID,
            type_id: typeID,
            emp_id: empID
        };
        Axios.post(
            "http://localhost:3001/api/hrmanager/updateEmployee",
            formValues
        ).then((res) => {
            if (!res.data.success) {
                alert("Error occured !!");
            } else {
                window.open(`/hrmanager/employee/view/${empID}`);
            }
        });
    }

    return(
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <>
                    <div className="container">
                        <div>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to='/hrmanager/employee' className={Styles["breadcrumb-link"]}>
                                        Employee
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    Add New Employee
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <h1 className="text-primary">New Employee</h1>
                            <hr/>

                            <div className="row gutters">
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className={Styles["account-settings"]}>
                                                <div className={Styles["user-profile"]}>
                                                    <div className={Styles["user-avatar"]}>
                                                        {/*{"../../../public"+this.state.employee.profile_picture}*/}
                                                        <img className={Styles["profile-dp"]} src={`../../../${profilePicture}`}
                                                             alt={"Add Profile Picture"}/>
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
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 className="mb-2 text-primary">Personal Details</h6>
                                                    </div>

                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="firstName">First Name</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="firstName"
                                                                   name="firstName"
                                                                   required={true}
                                                                   value={firstName}
                                                                   placeholder="Enter first name"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="middleName">Middle Name</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="middleName"
                                                                   name="middleName"
                                                                   required={true}
                                                                   value={middleName}
                                                                   placeholder="Enter middle name"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="lastName">Last Name</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="lastName"
                                                                   name="lastName"
                                                                   required={true}
                                                                   value={lastName}
                                                                   placeholder="Enter last name"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="address">Address</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="address"
                                                                   name="address"
                                                                   required={true}
                                                                   value={address}
                                                                   placeholder="Enter Address"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="email">Email</label>
                                                            <input type="email"
                                                                   className={Styles["form-control"]}
                                                                   id="email"
                                                                   name="email"
                                                                   required={true}
                                                                   value={email}
                                                                   placeholder="Enter Email Address"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="contactNum">Contact Number</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="contactNum"
                                                                   name="contactNum"
                                                                   required={true}
                                                                   value={contactNum}
                                                                   placeholder="Enter Contact Number"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="emergencyNum">Emergency Number</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="emergencyNum"
                                                                   name="emergencyNum"
                                                                   required={true}
                                                                   value={emergencyNum}
                                                                   placeholder="Enter Emergency Number"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="nic">NIC</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="nic"
                                                                   name="nic"
                                                                   required={true}
                                                                   value={nic}
                                                                   placeholder="Enter NIC Number"
                                                                   onChange={handleInputChange}/>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="bday">Birthday</label>
                                                            <input type="date"
                                                                   className={Styles["form-control"]}
                                                                   id="bday"
                                                                   name="bday"
                                                                   required={true}
                                                                   value={bday}
                                                                   placeholder="Select Birthday"
                                                                   onChange={handleInputChange}/>
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
                                                                onChange={handleInputChange}>
                                                                <option value="" hidden={true}>Select Marital Status</option>
                                                                <option value={0} >Single</option>
                                                                <option value={1} >Married</option>
                                                            </select>
                                                        </FormGroup>
                                                    </div>

                                                </div>

                                                <hr/>

                                                <div className="row gutters">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 className="mt-3 mb-2 text-primary">Employee Details</h6>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="emergencyNum">Employee ID</label>
                                                            <input type="text"
                                                                   className={Styles["form-control"]}
                                                                   id="empID"
                                                                   name="empID"
                                                                   required={true}
                                                                   value={empID}
                                                                   placeholder="Enter Employee ID"
                                                                   readOnly={true}
                                                                   onChange={handleInputChange}/>
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
                                                                onChange={handleInputChange}>
                                                                <option value="" hidden={true}>Select Department</option>
                                                                {departments.map(({ dept_id, name }, index) => <option value={dept_id} >{name}</option>)}
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
                                                                onChange={handleInputChange}>
                                                                <option value="" hidden={true}>Select Designation</option>
                                                                {types.map(({ type_id, type_name }, index) => <option value={type_id} >{type_name}</option>)}
                                                            </select>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <FormGroup>
                                                            <label htmlFor="empStatusId">Employee status</label>
                                                            <select
                                                                className={Styles["form-control"]}
                                                                id="empStatusId"
                                                                name="empStatusId"
                                                                placeholder="Select Status"
                                                                required={true}
                                                                value={empStatusId}
                                                                onChange={handleInputChange}>
                                                                <option value="" hidden={true}>Select Employee Status</option>
                                                                {status.map(({ emp_status_id, name }, index) => <option value={emp_status_id} >{name}</option>)}
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

                                                </div>

                                                <div className="row gutters">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="text-right">
                                                            <Link to={"/hrmanager/employee"} >
                                                                <button type="button" id="cancel" name="cancel"
                                                                        className="btn btn-secondary">Cancel
                                                                </button>
                                                            </Link>
                                                            <button type="submit" id="submit" name="submit"
                                                                    className="btn btn-primary">Add
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