import React from "react";
import styles from "./ProfileViewComponent.module.css"
import {Nav, Breadcrumb, BreadcrumbItem, Card, CardBody, List, ListGroup, ListGroupItem, Button} from "reactstrap";
import {Link} from "react-router-dom";
import FindTypeById from "../../../shared/findTypeById";
import FindDepartmentById from "../../../shared/findDepartmentById";
import findEmployeeStatusById from "../../../shared/findEmployeeStatusById";
import findPayGradeByID from "../../../shared/findPayGradeByID";

function Maritalstate(isMarried){
    if(isMarried == 0){
        return("Single")
    }else{
        return("Married")
    }
}

function ProfileView(props){

    const profileStyleClass = "rounded-circle " + styles["profile-dp"]

    return(
        <div className="container">
            <div className={styles["main-body"]}>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            {/*SHould add a link */}
                            Employee
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.employee.first_name + " " + props.employee.last_name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.employee.first_name + " " + props.employee.last_name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">

                        {/*Profile picture and basic information*/}
                        <Card>
                            <CardBody>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={props.employee.profile_picture} alt={props.employee.first_name + " " + props.employee.last_name} className={profileStyleClass} width="150"/>
                                    <div className="mt-3">
                                        <h4>{props.employee.first_name + " " + props.employee.middle_name + " " + props.employee.last_name}</h4>
                                        <p className="text-secondary mb-1">{FindTypeById(props.employee.type_id)}</p>
                                        <p className="text-muted font-size-sm">{FindDepartmentById(props.employee.dept_id).name + " Department"}</p>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            {/*<Link to="/employee">*/}
                                                <Button className="fa fa-pencil">Edit</Button>
                                            {/*</Link>*/}
                                        </div>

                                        <div className="col-6">
                                            {/*<Link to="/employee">*/}
                                                <Button className="fa fa-trash">Delete</Button>
                                            {/*</Link>*/}
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
                                    <div className="col-8"><h6>{props.employee.email}</h6></div>
                                </ListGroupItem>

                                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                                    {/*<i className="fa fa-envelope fa-2x"></i>*/}
                                    <div className="col-1"><h6 className="fa fa-phone fa-1x"></h6></div>
                                    <div className="col-2"><h6>Mobile</h6></div>
                                    <div className="col-8"><h6>{props.employee.contact_num}</h6></div>
                                </ListGroupItem>

                                <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                                    {/*<i className="fa fa-envelope fa-2x"></i>*/}
                                    <div className="col-1"><h6 className="fa fa-home fa-1x"></h6></div>
                                    <div className="col-2"><h6>Post</h6></div>
                                    <div className="col-8"><h6>{props.employee.address}</h6></div>
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
                                        {props.employee.first_name + " " + props.employee.middle_name + " " + props.employee.last_name}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Employee ID</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {props.employee.emp_id}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">NIC</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {props.employee.nic}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">BirthDay</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {props.employee.bday}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Marital State</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {Maritalstate(props.employee.is_married)}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Emergency Contact</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {props.employee.emergency_contact}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Employee Status</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {findEmployeeStatusById(props.employee.emp_status_id)}
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-6">Pay-Grade</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {findPayGradeByID(props.employee.paygrade_id)}
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