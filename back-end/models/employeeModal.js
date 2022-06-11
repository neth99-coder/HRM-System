const {json} = require("express");
const db = require("../config/db");

//function to get all details of an employee for a given employee ID
function getEmployee(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM employee WHERE emp_id = ? ";
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

module.exports = {
    getEmployee,
    getEmployees,
    getLeaveTypes,
    getLeaveRequests,
    addLeaveRequest
}    