const {json} = require("express");
const db = require("../config/db");

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

    updateEmployee,
    addEmployee,
    deleteEmployee

}