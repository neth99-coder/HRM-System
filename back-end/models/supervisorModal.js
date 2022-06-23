const { json } = require("express");
const db = require("../config/db");

//function to get all pending leave requests for a supervisor
function getRequests(empId) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT leave_id,leave_request_id,emp_id,first_name,last_name,supervisor_id,state_id,reason,attachment,type, DATE_FORMAT(leave_begin, '%d-%m-%Y') AS leave_begin, DATE_FORMAT(leave_end, '%d-%m-%Y') AS leave_end FROM leave_request NATURAL JOIN leave_type NATURAL JOIN supervisor NATURAL JOIN employee WHERE state_id = 3 AND supervisor_id = ? ";
    db.query(sql, [empId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

function approveRequest(data) {
  return new Promise((resolve, reject) => {
   // console.log("Here");
    const sql =
      "UPDATE leave_request SET state_id = 1 WHERE leave_request_id = ?";
    db.query(sql, [data.leave_request_id], (err, result) => {
      if (result) {
        // console.log("inserted");
        return resolve(result);
      } else {
        // console.log(err);
        return reject(err);
      }
    });
  });
}

function rejectRequest(data) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE leave_request SET state_id = 2 WHERE leave_request_id = ?";
    db.query(sql, [data.leave_request_id], (err, result) => {
      if (result) {
        // console.log("inserted");
        return resolve(result);
      } else {
        // console.log(err);
        return reject(err);
      }
    });
  });
}

//function to get all details of all employees who are absent today
function getAbsentToday(){
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE() >= leave_begin AND CURDATE() <= leave_end)" ;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

//function to get all details of all employees who willbe absent tomorrow
function getAbsentTomorrow(){
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE()+1 >= leave_begin AND CURDATE()+1 <= leave_end)" ;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

//function to get present employee count today
function getWorkingToday(){
  return new Promise((resolve, reject) => {
    var sql = "SELECT department.name, COUNT(attendance.emp_id) as emp_count FROM (employee INNER JOIN department ON employee.dept_id = department.dept_id),attendance WHERE employee.emp_id = attendance.emp_id AND attendance.date = CURDATE() GROUP BY department.name" ;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });  
}

//function to get leave types with counts; today
function getLeaveTypesCount(){
  return new Promise((resolve, reject) => {
    var sql = "SELECT leave_type.type, COUNT(leave_request.emp_id) AS leave_type_count FROM leave_request NATURAL JOIN leave_type WHERE (CURDATE() >= leave_request.leave_begin AND CURDATE() <= leave_request.leave_end) AND leave_request.state_id = 1 GROUP BY leave_type.type" ;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });  
}

module.exports = { getRequests,approveRequest,rejectRequest, getAbsentToday, getAbsentTomorrow, getWorkingToday, getLeaveTypesCount };
