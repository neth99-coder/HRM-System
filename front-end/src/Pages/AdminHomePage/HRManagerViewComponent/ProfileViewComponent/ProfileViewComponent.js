import React from "react";
import styles from "./ProfileViewComponent.module.css"
import {
    Nav,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    List,
    ListGroup,
    ListGroupItem,
    Button,
    NavLink
} from "reactstrap";

import FindDepartmentById from "../../../../shared/findDepartmentById";
import findEmployeeStatusById from "../../../../shared/findEmployeeStatusById";
import findPayGradeByID from "../../../../shared/findPayGradeByID";
import {Link,useLocation, useNavigate} from "react-router-dom";
import Axios  from "axios";

function Maritalstate(isMarried){
    if(isMarried == 0){
        return("Single")
    }else{
        return("Married")
    }
}


function ProfileView(props){

    const profileStyleClass = "rounded-circle " + styles["profile-dp"]
    const location = useLocation();//route states
    const hrmanager = location.state;
    const navigate = useNavigate(); 

    const deleteHRM = ()=>{
        const data={emp_id:hrmanager.emp_id,profile_picture:hrmanager.profile_picture}
        Axios.post(`http://localhost:3001/api/employee/hr-manager-delete`,data).then(
      (res) => {
       if(res.data.success){
        navigate("/admin/home")
       }else{
        alert("a fail")
       }
      }
    )
    }

    return(
        <div>
            <div className={styles["main-body"]}>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/admin/home" className={styles["breadcrumb-link"]}>
                                Staff
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                        {hrmanager.first_name + " " + hrmanager.last_name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{hrmanager.first_name + " " + hrmanager.last_name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">

                        {/*Profile picture and basic information*/}
                        <Card>
                            <CardBody>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={`http://localhost:3001/images/${hrmanager.profile_picture}`} alt={hrmanager.first_name + " " + hrmanager.last_name} className={profileStyleClass} width="150"/>
                                    <div className="mt-3">
                                        <h4>{hrmanager.first_name + " " + hrmanager.middle_name + " " + hrmanager.last_name}</h4>
                                        <p className="text-secondary mb-1">{hrmanager.type_name}</p>
                                        <p className="text-muted font-size-sm">{FindDepartmentById(hrmanager.dept_id) + " Department"}</p>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <Link to={`/admin/hr-profile/edit`} state={hrmanager}>
                                                <Button className="fa fa-pencil">Edit</Button>
                                            </Link>
                                        </div>

                                        <div className="col-6">
                                                <Button className="fa fa-trash" onClick={deleteHRM}>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>


                        {/*Contact information*/}
                        <Card className="mt-3">
                            <ListGroup className="list-group-flush">
                                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                                    {/*<i className="fa fa-envelope fa-2x"></i>*/}
                                    <div className="col-1"><h6 className="fa fa-envelope fa-1x"></h6></div>
                                    <div className="col-2"><h6>Email</h6></div>
                                    <div className="col-8"><h6>{hrmanager.email}</h6></div>
                                </ListGroupItem>

                                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                                    {/*<i className="fa fa-envelope fa-2x"></i>*/}
                                    <div className="col-1"><h6 className="fa fa-phone fa-1x"></h6></div>
                                    <div className="col-2"><h6>Mobile</h6></div>
                                    <div className="col-8"><h6>{hrmanager.contact_num}</h6></div>
                                </ListGroupItem>

                                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                                    {/*<i className="fa fa-envelope fa-2x"></i>*/}
                                    <div className="col-1"><h6 className="fa fa-home fa-1x"></h6></div>
                                    <div className="col-2"><h6>Post</h6></div>
                                    <div className="col-8"><h6>{hrmanager.address}</h6></div>
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
                                        {hrmanager.first_name + " " + hrmanager.middle_name + " " + hrmanager.last_name}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Employee ID</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {hrmanager.emp_id}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">NIC</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {hrmanager.nic}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">BirthDay</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {hrmanager.bday}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Marital State</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {Maritalstate(hrmanager.is_married)}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Emergency Contact</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {hrmanager.emergency_contact}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Employee Status</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {findEmployeeStatusById(hrmanager.emp_status_id)}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Pay-Grade</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {findPayGradeByID(hrmanager.paygrade_id)}
                                    </div>
                                </div>


                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProfileView;