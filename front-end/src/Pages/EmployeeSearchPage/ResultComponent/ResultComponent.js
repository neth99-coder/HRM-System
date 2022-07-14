import React from 'react'
import { Table } from 'reactstrap'
import style from './ResultComponent.module.css'
import { useNavigate } from 'react-router-dom'

function Result(props) {
  let result
  const navigate = useNavigate()

  if (props.employeeid === '' && props.department === '') {
    result = []
    return <div></div>
  } else if (props.department === '') {
    result = props.employees.filter(
      (employee) => employee.emp_id === props.employeeid,
    )
  } else if (props.employeeid === '') {
    let employeeDepartment = props.departments.filter(
      (dept) => dept.dept_id === parseInt(props.department),
    )[0]
    result = props.employees.filter(
      (employee) => employee.dept_id === employeeDepartment.dept_id,
    )
  } else {
    let employeeDepartment = props.departments.filter(
      (dept) => dept.dept_id === parseInt(props.department),
    )[0]
    result = props.employees.filter(
      (employee) => employee.dept_id === employeeDepartment.dept_id,
    )
    result = result.filter((employee) => employee.emp_id === props.employeeid)
  }

  function findDepartmentById(dept_id) {
    let department = props.departments.filter(
      (dept) => dept.dept_id === dept_id,
    )
    if (department.length === 0) {
      return ''
    } else {
      return department[0].name
    }
  }

  const employeeResult = result.map((employee) => {
    return (
      <tr
        onClick={() => navigate('view/' + employee.emp_id)}
        key={employee.emp_id}
        className={style['hover-table']}
      >
        <td>{employee.emp_id}</td>
        <td>{employee.first_name + ' ' + employee.last_name}</td>
        <td>{findDepartmentById(employee.dept_id)}</td>
        <td>{employee.email}</td>
      </tr>
    )
  })

  if (result.length === 0) {
    return (
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
  } else {
    return (
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{employeeResult}</tbody>
        </Table>
      </div>
    )
  }
}

export default Result
