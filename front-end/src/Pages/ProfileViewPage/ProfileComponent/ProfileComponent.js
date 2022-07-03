import React from "react";
import styles from "./ProfileComponent.module.css"
import {
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import {useState} from "react";
import {useEffect} from "react";
import Axios from "axios";
import {Spinner} from "react-bootstrap";

function Maritalstate(isMarried){
    if(isMarried == 0){
        return("Single")
    }else{
        return("Married")
    }
}

function Profile(props){

    const [isLoading,setIsLoading] = useState(true);
    const [departments,setDepartments] = useState([]);
    const [types,setTypes] = useState([]);
    const [status,setStatus] = useState([]);
    const [payGrades,setPayGrades] = useState([]);

    const profileStyleClass = "rounded-circle " + styles["profile-dp"]

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

        setIsLoading(false);
    },[]);

    function findDepartmentById(dept_id){
        let department = departments.filter((dept) => dept.dept_id === dept_id);
        if(department.length === 0){
            return "";
        }else{
            return department[0].name;
        }
    }

    function findEmployeeStatusById(status_id){
        let type = status.filter((emp_type) => emp_type.emp_status_id === status_id);
        if(type.length === 0){
            return "";
        }else{
            let time = "full time";
            if(type[0].is_full_time === 0){
                time = "part time";
            }

            return(type[0].name + " - " + time);
        }
    }

    function findPayGradeByID(paygrade_id){
        let payGrade = payGrades.filter((paygrade) => paygrade.paygrade_id === paygrade_id);
        if(payGrade.length === 0){
            return "";
        }else{
            return(payGrade[0].name);
        }
    }

    function findTypeById(type_id){
        let type = types.filter((emp_type) => emp_type.type_id === type_id);
        if(type.length === 0){
            return "";
        }else{
            return type[0].type_name;
        }
    }

    return(
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <>
                    <div className={styles["main-body"]}>

                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">

                                {/*Profile picture and basic information*/}
                                <Card>
                                    <CardBody>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={`../../../${props.employee.profile_picture}`} alt={props.employee.first_name + " " + props.employee.last_name} className={profileStyleClass} width="150"/>
                                            <div className="mt-3">
                                                <h4>{props.employee.first_name + " " + props.employee.middle_name + " " + props.employee.last_name}</h4>
                                                <p className="text-secondary mb-1">{findTypeById(props.employee.type_id)}</p>
                                                <p className="text-muted font-size-sm">{findDepartmentById(props.employee.dept_id) + " Department"}</p>
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
                </>
                )}
        </div>

    );
}

export default Profile;