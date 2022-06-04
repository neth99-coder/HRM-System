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


module.exports = {
    getEmployee,
    getEmployees
}    