const { json } = require('express')
const db = require('../config/db')

//function to get all details of an employee for a given employee ID
function getEmployee(empId) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM employee WHERE emp_id = ? '
    db.query(sql, [empId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all employees
function getEmployees() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM employee'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

function getEmployeeNameandType() {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT first_name , last_name , type_name , emp_img FROM employee natural join user_type'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

function addEmployee(data) {
  return new Promise((resolve, reject) => {
    var sql =
      `INSERT INTO employee (emp_id , first_name ,middle_name, last_name,address,nic,bday,is_married,` +
      `contact_num,emergency_contact,email,dept_id,paygrade_id,emp_status_id,type_id,emp_img) ` +
      `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    db.query(
      sql,
      [
        data.emp_id,
        data.fname,
        data.mname,
        data.lname,
        data.address,
        data.nic,
        data.bday,
        data.is_married,
        data.contact_num,
        data.emergency_contact,
        data.email,
        data.dept_id,
        data.paygrade_id,
        data.emp_status_id,
        data.type_id,
        data.emp_img
      ],
      (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result)
        }
      },
    )
  })
}

module.exports = {
  addEmployee,
  getEmployee,
  getEmployees,
  getEmployeeNameandType,
}
