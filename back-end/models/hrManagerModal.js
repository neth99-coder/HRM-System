const { json } = require("express");
const db = require("../config/db");

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



module.exports = {getAbsentToday, getAbsentTomorrow, getWorkingToday, getLeaveTypesCount}