import React from "react";
import styles from "./ProfileViewComponent.module.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Spinner } from "react-bootstrap";
import authService from "../../../services/auth.service";

function Maritalstate(isMarried) {
  if (isMarried == 0) {
    return "Single";
  } else {
    return "Married";
  }
}

function ProfileView(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [delVisibility, setDelVisibility] = useState(true);

  const profileStyleClass = "rounded-circle " + styles["profile-dp"];

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

    setIsLoading(false);
  }, []);

  function findDepartmentById(dept_id) {
    let department = departments.filter((dept) => dept.dept_id === dept_id);
    if (department.length === 0) {
      return "";
    } else {
      return department[0].name;
    }
  }

  function findEmployeeStatusById(status_id) {
    let type = status.filter(
      (emp_type) => emp_type.emp_status_id === status_id
    );
    if (type.length === 0) {
      return "";
    } else {
      let time = "full time";
      if (type[0].is_full_time === 0) {
        time = "part time";
      }

      return type[0].name + " - " + time;
    }
  }

  function findPayGradeByID(paygrade_id) {
    let payGrade = payGrades.filter(
      (paygrade) => paygrade.paygrade_id === paygrade_id
    );
    if (payGrade.length === 0) {
      return "";
    } else {
      return payGrade[0].name;
    }
  }

  function findTypeById(type_id) {
    let type = types.filter((emp_type) => emp_type.type_id === type_id);
    if (type.length === 0) {
      return "";
    } else {
      return type[0].type_name;
    }
  }

  function handleDelete(event) {
    event.preventDefault();
    const formValues = {
      emp_id: props.employee.emp_id,
    };
    Axios.post(
      "http://localhost:3001/api/hrManager/deleteEmployee",
      formValues,
      {
        headers: { "x-auth-token": authService.getUserToken() },
      }
    ).then((res) => {
      if (!res.data.success) {
        alert("Error occured !!");
      } else {
        window.open(`/hrmanager/employee`);
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDelVisibility(false);
  }

  function handleCancel(event) {
    event.preventDefault();
    setDelVisibility(true);
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" className={styles["spinner"]}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div id="myModal" className={styles["modal"]} hidden={delVisibility}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <h2>Delete Employee</h2>
              </div>
              <div className={styles["modal-body"]}>
                <p>
                  Are you sure you want to delete employee{" "}
                  {props.employee.emp_id} ?
                </p>
                <p>This will permanently remove this record ..</p>
              </div>
              <div className={styles["modal-footer"]}>
                <div className="row">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <Form onSubmit={handleCancel}>
                      <button
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-dark"
                      >
                        Cancel
                      </button>
                    </Form>
                  </div>
                  <div className="col-4 col-sm-3 col-md-2">
                    <Form onSubmit={handleDelete}>
                      <button
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-dark"
                      >
                        Delete
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["main-body"]}>
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link
                    to="/hrmanager/employee"
                    className={styles["breadcrumb-link"]}
                  >
                    Employee
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {props.employee.first_name + " " + props.employee.last_name}
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>
                  {props.employee.first_name + " " + props.employee.last_name}
                </h3>
                <hr />
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                {/*Profile picture and basic information*/}
                <Card>
                  <CardBody>
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={`../../../assets/profile_picture/${props.employee.profile_picture}`}
                        alt={
                          props.employee.first_name +
                          " " +
                          props.employee.last_name
                        }
                        className={profileStyleClass}
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>
                          {props.employee.first_name +
                            " " +
                            props.employee.middle_name +
                            " " +
                            props.employee.last_name}
                        </h4>
                        <p className="text-secondary mb-1">
                          {findTypeById(props.employee.type_id)}
                        </p>
                        <p className="text-muted font-size-sm">
                          {findDepartmentById(props.employee.dept_id) +
                            " Department"}
                        </p>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <Link
                            to={
                              "/hrmanager/employee/edit/" +
                              props.employee.emp_id
                            }
                          >
                            <Button className="fa fa-pencil">Edit</Button>
                          </Link>
                        </div>

                        <div className="col-6">
                          {/*<Link to="/employee">*/}
                          <Form onSubmit={handleSubmit}>
                            <Button
                              type="submit"
                              id="submit"
                              name="submit"
                              className="fa fa-trash"
                            >
                              Delete
                            </Button>
                          </Form>
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
                      <div className="col-1">
                        <h6 className="fa fa-envelope fa-1x"></h6>
                      </div>
                      <div className="col-2">
                        <h6>Email</h6>
                      </div>
                      <div className="col-8">
                        <h6>{props.employee.email}</h6>
                      </div>
                    </ListGroupItem>

                    <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                      {/*<i className="fa fa-envelope fa-2x"></i>*/}
                      <div className="col-1">
                        <h6 className="fa fa-phone fa-1x"></h6>
                      </div>
                      <div className="col-2">
                        <h6>Mobile</h6>
                      </div>
                      <div className="col-8">
                        <h6>{props.employee.contact_num}</h6>
                      </div>
                    </ListGroupItem>

                    <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
                      {/*<i className="fa fa-envelope fa-2x"></i>*/}
                      <div className="col-1">
                        <h6 className="fa fa-home fa-1x"></h6>
                      </div>
                      <div className="col-2">
                        <h6>Post</h6>
                      </div>
                      <div className="col-8">
                        <h6>{props.employee.address}</h6>
                      </div>
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
                        {props.employee.first_name +
                          " " +
                          props.employee.middle_name +
                          " " +
                          props.employee.last_name}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">Employee ID</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {props.employee.emp_id}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">NIC</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {props.employee.nic}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">BirthDay</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {props.employee.bday}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">Marital State</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {Maritalstate(props.employee.is_married)}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">Emergency Contact</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {props.employee.emergency_contact}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-6">Employee Status</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {findEmployeeStatusById(props.employee.emp_status_id)}
                      </div>
                    </div>
                    <hr />

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

export default ProfileView;
