const { json } = require('express')
const db = require('../config/db')
const fs = require('fs')

//function to get all details of an employee for a given employee ID
function getEmployee(empId) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT address,DATE_FORMAT(bday, '%Y-%m-%d') AS bday, contact_num, dept_id,email,emergency_contact,emp_id,emp_status_id,first_name,is_married,last_name,middle_name,nic,paygrade_id,type_id,profile_picture,job_type_id FROM employee WHERE emp_id = ? "
    db.query(sql, [empId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of an employee for a given employee ID including new attributes
function getEmployeeFull(empId) {
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

//function to get all details of all departments
function getDepartments() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM department'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all job Types
function getJobTypes() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM job_type'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all employee types
function getTypes() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM user_type'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all employee status
function getStatus() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM emp_status'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all paygrades
function getPaygrades() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM paygrade'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to update employee record
function updateEmployee(data) {
  return new Promise((resolve, reject) => {
    const keys = data.keys
    const values = data.values
    let sql = 'UPDATE employee SET '
    for (let i = 1; i < keys.length; i++) {
      if (i !== 1) {
        sql += ','
      }
      sql += '`' + keys[i] + '` = ' + '?'
    }
    sql += ' WHERE emp_id = ?'
    db.query(sql, values, (err, result) => {
      if (result) {
        return resolve(result)
      } else {
        return reject(err)
      }
    })
  })
}

//upload profile_picture
function dpUpload(file, fileName) {
  const newPath = __dirname + '/../public/profilePictures/'

  file.mv(`${newPath}${fileName}`, (err) => {
    if (err) {
      return reject(err)
    } else {
    }
  })
}

//function to add employee record
function addEmployee(data) {
  return new Promise((resolve, reject) => {
    const keys = data.keys
    const values = data.values
    let sql = 'INSERT INTO employee ('
    for (let i = 0; i < keys.length; i++) {
      if (i !== 0) {
        sql += ','
      }
      sql += ' `' + keys[i] + '` '
    }
    sql += ') VALUES ('
    for (let i = 0; i < keys.length; i++) {
      if (i !== 0) {
        sql += ','
      }
      sql += '?'
    }
    sql += ')'
    db.query(sql, values, (err, result) => {
      if (result) {
        return resolve(result)
      } else {
        return reject(err)
      }
    })
  })
}

module.exports = {
  getEmployee,
  getEmployeeFull,
  getDepartments,
  getJobTypes,
  getTypes,
  getStatus,
  getPaygrades,
  updateEmployee,
  dpUpload,
  addEmployee,
}
