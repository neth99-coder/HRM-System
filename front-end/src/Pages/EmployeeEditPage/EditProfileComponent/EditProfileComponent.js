import React,{Component} from "react";
import Header from "../../../Components/Header/Header";
import NavBar from "../../../Components/Header/NavBarComponent/NavBarComponent";
import {Breadcrumb, BreadcrumbItem,Card, CardBody, Form,FormGroup,Label,Col,Input,FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";
import FindEmployeeByID from "../../../shared/findEmployeeByID";
import Styles from "./EditProfie.module.css";

class EditProfile extends Component{

    constructor(props) {
        super(props);

        this.state = {
            employee: FindEmployeeByID(this.props.id),
            isSaved: false,
            firstName: FindEmployeeByID(this.props.id).first_name,
            middleName: FindEmployeeByID(this.props.id).middle_name,
            lastName: FindEmployeeByID(this.props.id).last_name,
            email: FindEmployeeByID(this.props.id).email,
            deptID: FindEmployeeByID(this.props.id).dept_id,
            typeID: FindEmployeeByID(this.props.id).type_id,
            address: FindEmployeeByID(this.props.id).address,
            nic: FindEmployeeByID(this.props.id).nic,
            bday: FindEmployeeByID(this.props.id).bday,
            isMarried: FindEmployeeByID(this.props.id).is_married,
            contactNum: FindEmployeeByID(this.props.id).contact_num,
            emergencyNum: FindEmployeeByID(this.props.id).emergency_contact,
            paygradeID: FindEmployeeByID(this.props.id).paygrade_id,
            empStatusId: FindEmployeeByID(this.props.id).emp_status_id,
            empID: FindEmployeeByID(this.props.id).emp_id

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render() {
        return(
            <div className="container">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/hrmanager/employee' className={Styles["breadcrumb-link"]}>
                                Employee
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to={`/hrmanager/employee/view/${this.state.employee.emp_id}`} className={Styles["breadcrumb-link"]}>
                                {this.state.employee.first_name + " " + this.state.employee.last_name}
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Edit
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="text-primary">Edit Profile</h1>
                    <hr/>

                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className={Styles["account-settings"]}>
                                        <div className={Styles["user-profile"]}>
                                            <div className={Styles["user-avatar"]}>
                                                {/*{"../../../public"+this.state.employee.profile_picture}*/}
                                                <img className={Styles["profile-dp"]} src={`../../../${this.state.employee.profile_picture}`}
                                                     alt={this.state.employee.first_name + " " + this.state.employee.last_name}/>
                                            </div>
                                            <h5 className="user-name">{this.state.employee.first_name + " " + this.state.employee.last_name}</h5>
                                            <h6 className="user-email">{this.state.employee.email}</h6>
                                        </div>
                                        <div className={Styles["about"]}>
                                            <h5>About</h5>
                                            <p>{this.props.type[this.state.employee.type_id].type_name} - {this.props.departments[this.state.employee.dept_id].name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <Card>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
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
                                                           value={this.state.firstName}
                                                           placeholder="Enter first name"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.middleName}
                                                           placeholder="Enter middle name"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.lastName}
                                                           placeholder="Enter last name"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.address}
                                                           placeholder="Enter Address"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.email}
                                                           placeholder="Enter Email Address"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.contactNum}
                                                           placeholder="Enter Contact Number"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.emergencyNum}
                                                           placeholder="Enter Emergency Number"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.nic}
                                                           placeholder="Enter NIC Number"
                                                           onChange={this.handleInputChange}/>
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
                                                           value={this.state.bday}
                                                           placeholder="Select Birthday"
                                                           onChange={this.handleInputChange}/>
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
                                                        value={this.state.isMarried}
                                                        onChange={this.handleInputChange}>
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
                                                           value={this.state.empID}
                                                           placeholder="Enter Employee ID"
                                                            readOnly={true}
                                                           onChange={this.handleInputChange}/>
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
                                                        value={this.state.deptID}
                                                        onChange={this.handleInputChange}>
                                                        {this.props.departments.map(({ id, name }, index) => <option value={id} >{name}</option>)}
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
                                                        value={this.state.typeID}
                                                        onChange={this.handleInputChange}>
                                                        {this.props.type.map(({ type_id, type_name }, index) => <option value={type_id} >{type_name}</option>)}
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
                                                        value={this.state.empStatusId}
                                                        onChange={this.handleInputChange}>
                                                        {this.props.status.map(({ emp_status_id, name }, index) => <option value={emp_status_id} >{name}</option>)}
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
                                                        value={this.state.paygradeID}
                                                        onChange={this.handleInputChange}>
                                                        {this.props.paygrades.map(({ paygrade_id, name }, index) => <option value={paygrade_id} >{name}</option>)}
                                                    </select>
                                                </FormGroup>
                                            </div>

                                        </div>

                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="text-right">
                                                    <Link to={"/hrmanager/employee/view/" + this.state.employee.emp_id} >
                                                        <button type="button" id="cancel" name="cancel"
                                                                className="btn btn-secondary">Cancel
                                                        </button>
                                                    </Link>
                                                    <button type="submit" id="submit" name="submit"
                                                            className="btn btn-primary">Update
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
        );
    }
}

export default EditProfile;