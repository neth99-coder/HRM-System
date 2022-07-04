const {json} = require("express");
const db = require("../config/db");

//function to get all details of an employee for a given employee ID
function getEmployee(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT address,DATE_FORMAT(bday, '%Y-%m-%d') AS bday, contact_num, dept_id,email,emergency_contact,emp_id,emp_status_id,first_name,is_married,last_name,middle_name,nic,paygrade_id,type_id,profile_picture FROM employee WHERE emp_id = ? ";
        db.query(sql,[empId] ,(err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        });
      });
    } 

//function to get all details of all employees
function getEmployees() {
    return new Promise((resolve, reject) => {
      var sql = "SELECT * FROM employee";
      db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

//function to get Leave types
function getLeaveTypes(){
  return new Promise((resolve,reject)=>{
    var sql = "SELECT * FROM leave_type"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  })
}

//function to get leaves of a perticular employee
function getLeaveRequests(empId){
  return new Promise((resolve, reject) => {
      var sql = "SELECT leave_id,leave_request_id,emp_id,supervisor_id,state_id,reason,attachment,type, DATE_FORMAT(leave_begin, '%d-%m-%Y') AS leave_begin, DATE_FORMAT(leave_end, '%d-%m-%Y') AS leave_end FROM leave_request NATURAL JOIN leave_type WHERE emp_id = ?";
      db.query(sql,[empId] ,(err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

//function to add new Leave Request 
function addLeaveRequest(data){
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO leave_request (emp_id,supervisor_id,leave_id,state_id,reason,leave_begin,leave_end) VALUES (?,?,?,?,?,?,?)";
    db.query(
      sql,
      [data.emp_id,data.supervisor_id,data.leave_id,data.state_id,data.reason,data.leave_begin,data.leave_end],
      (err, result) => {
        if (result) {
          // console.log("inserted");
          return resolve(result);
        } else {
          // console.log(err);
          return reject(err);
        }
      }
    );  
  })
}

//function to get all details of an employee for a given department_ID
function getEmployeeByDeptId(deptId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM employee WHERE dept_id = ? ";
        db.query(sql,[deptId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get all details of an employee for a given department_ID and employee_id
function getEmployeeByEmpIdDeptId(empId,deptId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM employee WHERE dept_id = ? AND emp_id = ?";
        db.query(sql,[deptId,empId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

module.exports = {
    getEmployee,
    getEmployees,
    getLeaveTypes,
    getLeaveRequests,
    addLeaveRequest,
    getEmployeeByDeptId,
    getEmployeeByEmpIdDeptId
}    