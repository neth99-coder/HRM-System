import React, {Component, useState} from "react";
import {Button,Form,FormGroup,Label,Input,Col,FormFeedback} from "reactstrap";
import Option from "../../../Components/UI/Dropdown/Option";
import {Link} from "react-router-dom";
import AddNewField from "./NewFiledComponent/AddNewFieldComponent";
import RemoveField from "./RemoveFieldComponent/RemoveFieldComponent";

function Search(props){


    const [employeeId,setEmployeeId] = useState(false);
    const [hiddenAttribute,setHiddenAttribute] = useState(true);
    const [hiddenRemove,setHiddenRemove] = useState(true);


    function handleInputChange(event){
        const target = event.target;
        props.searchChange(target);
    }

    function handleSubmit(event){
        event.preventDefault();

    }

    function handleNewField(event){
        event.preventDefault();
        setHiddenAttribute(false);
    }

    function handleRemoveField(event){
        event.preventDefault();
        setHiddenRemove(false);
    }

    const departmentList = props.departments.map((department) =>{
        return(
            <option key={department.dept_id} value={department.dept_id}>{department.name}</option>
        );
    });




        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Search Employee</h3>
                    </div>

                    <div className="col-12">
                        <Form  onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <FormGroup row>
                                        <Label htmlFor="employeeid" lg={4}>Employee ID:</Label>
                                        <Col lg={6}>
                                            <Input type="text" id="employeeid" name="employeeid"
                                                   placeholder="Employee ID"
                                                   value={props.employeeid}
                                                   onChange={handleInputChange}
                                                   />
                                        </Col>
                                    </FormGroup>
                                </div>

                                <div className="col-5">
                                    <FormGroup row>
                                        <Label htmlFor="department" lg={4}>Department:</Label>
                                        <Col lg={6}>
                                            <Input type="select" id="department" name="department"
                                                   value={props.department}
                                                   onChange={handleInputChange}
                                                    placeholder={"Department"}>
                                                    <option value={""} hidden={true}>Department</option>
                                                   {departmentList}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </div>
                        </Form>
                    </div>
                <hr/>
                    <div className="row">
                        <div className="col-3 col-lg-2 m-1">
                            <Link to={"/hrmanager/employee/add-new"} >
                                <button type="button" id="addNew" name="addNew"
                                        className="btn btn-primary">Add New Employee
                                </button>
                            </Link>
                        </div>
                        <div className="col-3 col-lg-2 m-1">
                            <Form onSubmit={handleNewField} >
                                <button type="submit" id="addNew" name="addNew"
                                        className="btn btn-primary">Add New Attribute
                                </button>
                            </Form>
                        </div>
                        <div className="col-3 col-lg-2 m-1">
                            <Form onSubmit={handleRemoveField} >
                                <button type="submit" id="addNew" name="addNew"
                                        className="btn btn-primary">Remove Attributes
                                </button>
                            </Form>
                        </div>
                    </div>

                    <AddNewField hidden={hiddenAttribute} setHidden={setHiddenAttribute}/>
                    <RemoveField hidden={hiddenRemove} setHidden={setHiddenRemove} />
                </div>
            </div>

        );

}

export default Search;
