import React from "react";
import {Table} from "reactstrap";

function Result(props){

    let result;


    if(props.employeeid === '' && props.department === ''){
        result = [];
        return(
            <div></div>
        );
    }else if(props.department === ''){
        result = props.employees.filter((employee)=> employee.emp_id === props.employeeid);

    }else if(props.employeeid === ''){
        let employeeDepartment = props.departments.filter((dept)=>dept.name === props.department)[0];
        result = props.employees.filter((employee)=> employee.dept_id === employeeDepartment.id);
    }else{
        let employeeDepartment = props.departments.filter((dept)=>dept.name === props.department)[0];
        result = props.employees.filter((employee)=> employee.dept_id === employeeDepartment.id);
        result = result.filter((employee)=> employee.emp_id === props.employeeid);
    }

    const employeeResult = result.map((employee) =>{
        return(
            <tr>
                <td>{employee.emp_id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.dept_id}</td>
                <td>{employee.email}</td>
            </tr>
        );
    });

    if(result.length===0){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 m-auto text-center align-items-center">
                        <hr />
                        <i className="fa  fa-search fa-3x align-self-center"></i>
                        <h1>No result found!</h1>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeResult}
                </tbody>
            </Table>
        )
    }
}

export default Result;