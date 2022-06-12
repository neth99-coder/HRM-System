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
module.exports = { getRequests,approveRequest,rejectRequest };
