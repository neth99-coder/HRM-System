const {json} = require("express");
const db = require("../config/db");
const arrayOrganizer = require("../helpers/arrayOrganizer");

//function to get all details of all departments
function getDepartments() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM department";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                
                return resolve(result);
            }
        });
    });
}

//function to get all details of all employee types
function getTypes() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM user_type";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get all details of all employee status
function getStatus() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM emp_status";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get all details of all paygrades
function getPaygrades() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM paygrade";
        db.query(sql, (err, result) => {
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

//function to get all employee ID
function getEmployeeIds(){
    return new Promise((resolve, reject) => {
        var sql = "SELECT emp_id FROM employee";
        db.query(sql,[] ,(err, result) => {
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
        var sql = "SELECT address,DATE_FORMAT(bday, '%Y-%m-%d') AS bday, contact_num, dept_id,email,emergency_contact,emp_id,emp_status_id,first_name,is_married,last_name,middle_name,nic,paygrade_id,type_id FROM employee";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get all details of employee department
function getEmployeeDepartment(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT department.dept_id,department.name,department.building,department.description FROM department,employee where employee.emp_id = ? and department.dept_id = employee.dept_id;";
        db.query(sql,[empId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get all details of employee user type
function getEmployeeType(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT user_type.type_id,user_type.type_name FROM user_type,employee where employee.emp_id = ? and user_type.type_id = employee.type_id;";
        db.query(sql,[empId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to update employee record
function updateEmployee(data){
    return new Promise((resolve,reject)=>{
        const sql = "UPDATE employee SET address = ? , bday = ?, contact_num = ?, dept_id = ?, email = ?, emergency_contact = ?, emp_status_id = ?, first_name = ?, is_married = ?, last_name = ?, middle_name = ?, nic = ?, paygrade_id = ?, type_id = ? WHERE emp_id = ?";
        db.query(
            sql,
            [data.address, data.bday, data.contact_num,data.dept_id,data.email,data.emergency_contact,data.emp_status_id, data.first_name, data.is_married, data.last_name, data.middle_name, data.nic, data.paygrade_id, data.type_id, data.emp_id],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log("f2efes");
                    return reject(err);

                }
            }
        );
    })
}

//function to add employee record
function addEmployee(data){
    return new Promise((resolve,reject)=>{
        const sql = "INSERT INTO employee (address , bday , contact_num, dept_id, email, emergency_contact, emp_status_id, first_name, is_married, last_name, middle_name, nic, paygrade_id, type_id,emp_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(
            sql,
            [data.address, data.bday, data.contact_num,data.dept_id,data.email,data.emergency_contact,data.emp_status_id, data.first_name, data.is_married, data.last_name, data.middle_name, data.nic, data.paygrade_id, data.type_id, data.emp_id],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log("f2efes");
                    return reject(err);

                }
            }
        );
    })
}

//function to delete employee record
function deleteEmployee(data){
    return new Promise((resolve,reject)=>{
        const sql = "DELETE FROM employee WHERE emp_id = ?";
        db.query(
            sql,
            [data.emp_id],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log("f2efes");
                    return reject(err);

                }
            }
        );
    })
}

//function to get all details of all employees who are absent today
function getAbsentToday(){
    return new Promise((resolve, reject) => {
        var sql = "SELECT emp_id,profile_picture FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE() >= leave_begin AND CURDATE() <= leave_end) AND state_id = 1" ;
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
        var sql = "SELECT emp_id,profile_picture FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE()+1 >= leave_begin AND CURDATE()+1 <= leave_end) AND state_id = 1" ;
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
        var sql = "SELECT department.name, COUNT(attendance.emp_id) as emp_count FROM (employee INNER JOIN department ON employee.dept_id = department.dept_id),attendance WHERE employee.emp_id = attendance.emp_id AND attendance.date = CURDATE() AND is_present = 1 GROUP BY department.name" ;
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                //console.log(arrayOrganizer.todayWorkingArray(result));
                return resolve(arrayOrganizer.todayWorkingArray(result));
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
  
          return resolve(arrayOrganizer.todayLeaveArray(result));
        }
      });
    });  
  }

module.exports = {
    getDepartments,
    getTypes,
    getStatus,
    getPaygrades,
    getEmployeeByEmpIdDeptId,
    getEmployeeByDeptId,
    getEmployee,
    getEmployees,
    getEmployeeDepartment,
    getEmployeeType,
    getEmployeeIds,
    getAbsentToday,
    getAbsentTomorrow,
    getWorkingToday,
    getLeaveTypesCount,

    updateEmployee,
    addEmployee,
    deleteEmployee

}