const { json } = require('express')
const db = require('../config/db')
const arrayOrganizer = require('../helpers/arrayOrganizer')
const { reject } = require('bcrypt/promises')
const bcrypt = require("bcrypt");

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
        var sql = "SELECT * FROM job_type";
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

//function to get all details of an employee for a given department_ID and employee_id
function getEmployeeByEmpIdDeptId(empId, deptId) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM employee WHERE dept_id = ? AND emp_id = ?'
    db.query(sql, [deptId, empId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of an employee for a given department_ID
function getEmployeeByDeptId(deptId) {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM employee WHERE dept_id = ? '
    db.query(sql, [deptId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of an employee for a given employee ID
function getEmployee(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT address,DATE_FORMAT(bday, '%Y-%m-%d') AS bday, contact_num, dept_id,email,emergency_contact,emp_id,emp_status_id,first_name,is_married,last_name,middle_name,nic,paygrade_id,type_id,profile_picture,job_type_id,bank_account_num FROM employee WHERE emp_id = ? ";
        db.query(sql,[empId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get supervisor by employee id
function getSupervisorByEmpId(empId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT supervisor_id, first_name, last_name FROM employee,supervisor WHERE supervisor.emp_id = ? AND supervisor.supervisor_id = employee.emp_id";
        db.query(sql,[empId] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

//function to get employee ids of supervisors
function getSupervisorId(){
    return new Promise((resolve, reject) => {
        var sql = "SELECT emp_id, first_name, last_name FROM employee WHERE type_id = 2 OR type_id = 3";
        db.query(sql ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
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

//function to get all employee ID
function getEmployeeIds() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT emp_id FROM employee'
    db.query(sql, [], (err, result) => {
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
    var sql =
      "SELECT address,DATE_FORMAT(bday, '%Y-%m-%d') AS bday, contact_num, dept_id,email,emergency_contact,emp_id,emp_status_id,first_name,is_married,last_name,middle_name,nic,paygrade_id,type_id FROM employee"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

function getOneEmployeesFull() {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM employee LIMIT 1'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of employee department
function getEmployeeDepartment(empId) {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT department.dept_id,department.name,department.building,department.description FROM department,employee where employee.emp_id = ? and department.dept_id = employee.dept_id;'
    db.query(sql, [empId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of employee user type
function getEmployeeType(empId) {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT user_type.type_id,user_type.type_name FROM user_type,employee where employee.emp_id = ? and user_type.type_id = employee.type_id;'
    db.query(sql, [empId], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to update employee record
function updateEmployee(data){
    return new Promise((resolve,reject)=>{
        const keys = data.keys;
        const values = data.values;
        let sql = "UPDATE employee SET ";
        for(let i = 1; i < keys.length; i++){
            if(i !== 1){
                sql += ","
            }
            sql += "`" + keys[i] + "` = " + "?"
        }
        sql += " WHERE emp_id = ?";
        db.query(
            sql,
            values,
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log(err)
                    return reject(err);

                }
            }
        );
    })
}


//function to update employee_supervisor record
function updateSupervisor(data){
    return new Promise((resolve,reject)=>{
        let sql = "UPDATE supervisor SET supervisor_id = ? WHERE emp_id = ?";
        db.query(
            sql,
            [data.supervisor_id,data.emp_id],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log(err)
                    return reject(err);

                }
            }
        );
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
        console.log(err)
        return reject(err)
      }
    })
  })
}

function getleaveConfig(paygrade_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM paygrade_leave WHERE paygrade_id =${paygrade_id}`
      db.query(sql, (err, result) => {
        if (result) {
          return resolve(result)
        } else {
          return reject(err)
        }
      })
    })
  }

//adds leave configurations
function updateleaveConfig(data) {
    return new Promise((resolve, reject) => {
  
    const sql = `UPDATE paygrade_leave SET num_of_leaves = ${data.leaves} WHERE paygrade_id =${data.paygrade_id} and leave_id = ${data.leave_id}`
        console.log(sql)
      db.query(sql, (err, result) => {
        if (result) {
          return resolve(result)
        } else {
          return reject(err)
        }
      })
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
                    console.log(err);
                    return reject(err);

                }
            }
        );
    })
}

//function to Remove employee attribute
function deleteColumns(data){
    fields = data.fields;
    return new Promise((resolve,reject)=>{
        let sql = "ALTER TABLE employee ";
        for(let i =0; i < fields.length; i++){
            if(i != 0){
                sql += ", "
            }
            sql += "DROP COLUMN `" + fields[i] + '`';
        }
        db.query(
            sql,
            [],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log(err);
                    return reject(err);

                }
            }
        );
    })
}

//function to add Superviosor
function addSupervisor(data){
    return new Promise((resolve,reject)=>{
        const sql = "INSERT INTO supervisor (emp_id,supervisor_id) VALUES(?,?)";
        db.query(
            sql,
            [data.emp_id,data.supervisor_id],
            (err,result) => {
                if(result){
                    return resolve(result);
                }else{
                    console.log(err);
                    return reject(err);

                }
            }
        );
    })
}



//function to get all details of all employees who are absent today
function getAbsentToday() {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT emp_id,profile_picture FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE() >= leave_begin AND CURDATE() <= leave_end) AND state_id = 1'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get all details of all employees who willbe absent tomorrow
function getAbsentTomorrow() {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT emp_id,profile_picture FROM `leave_request` NATURAL JOIN employee WHERE (CURDATE()+1 >= leave_begin AND CURDATE()+1 <= leave_end) AND state_id = 1'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

//function to get present employee count today
function getWorkingToday() {
  return new Promise((resolve, reject) => {
    var sql =
      'SELECT department.name, COUNT(attendance.emp_id) as emp_count FROM (employee INNER JOIN department ON employee.dept_id = department.dept_id),attendance WHERE employee.emp_id = attendance.emp_id AND attendance.date = CURDATE() AND is_present = 1 GROUP BY department.name'
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(arrayOrganizer.todayWorkingArray(result))
      }
    })
  })
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


 //function to get aattendance for marking
function getAttendanceNotMarked(){
    return new Promise((resolve, reject) => {
        var sql = "SELECT employee.emp_id,employee.first_name,employee.last_name,employee.dept_id,department.name FROM employee NATURAL JOIN department WHERE emp_id NOT IN (SELECT emp_id FROM attendance WHERE date = CURDATE())";
        db.query(sql,[] ,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(arrayOrganizer.attendanceArray(result));
            }
        });
    });
} 

 //function to add aattendance for marking
 function addAttendance(data){
    return new Promise((resolve, reject) => {
        var sql = arrayOrganizer.insertQuery(data);
        db.query(sql,(err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
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

//function to add new column
function addColumn(data){
    return new Promise((resolve,reject)=>{
        if(data.dataType === "varchar"){
            const sql = "ALTER TABLE employee ADD COLUMN (`" + data.fieldName + "` " + data.dataType + "(" + data.maxSize + "))";
            db.query(
                sql,
                [],
                (err,result) => {
                    if(result){
                        return resolve(result);
                    }else{
                        return reject(err);

                    }
                }
            );
        }else{
            const sql = "ALTER TABLE employee ADD COLUMN (`" + data.fieldName+ "` " + data.dataType + ")";
            db.query(
                sql,
                [data.fieldName,data.dataType],
                (err,result) => {
                    if(result){
                        return resolve(result);
                    }else{
                        console.log(err);
                        return reject(err);

                    }
                }
            );
        }
    })

}

//get data types of employee table columns
function getDataTypes() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME   = 'employee' ";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

function editEmployee(data){
    return new Promise((resolve,reject)=>{
        const keys = data.keys;
        const values = data.values;

        try {
            db.beginTransaction((err)=>{
                if(err){
                    throw err;
                }

                let sql1 = "UPDATE employee SET ";
                for(let i = 1; i < keys.length; i++){
                    if(i !== 1){
                        sql1 += ","
                    }
                    sql1 += "`" + keys[i] + "` = " + "?"
                }
                sql1 += " WHERE emp_id = ?";

                db.query(sql1, values, (err,result) => {
                        if(result){

                            let sql2 = "UPDATE supervisor SET supervisor_id = ? WHERE emp_id = ?";
                            db.query(sql2, [data.supervisor_id,data.emp_id], (err,result) => {
                                    if(err){
                                        console.log(err)
                                        return reject(err);
                                    }else{
                                        db.commit((err)=>{
                                            if(err){
                                                throw err;
                                            } else {
                                                return resolve(result);
                                            }
                                        });
                                    }
                                });
                        }else{
                            console.log(err)
                            return reject(err);
                        }
                    }
                );
            })
        }catch (err){
            db.rollback();
            return reject(err);
        }
    });
}

function addEmployeeTransaction(data){
    return new Promise((resolve, reject) => {
        const keys = data.keys
        const values = data.values

        try{
            db.beginTransaction((err)=>{
                if(err){
                    throw err;
                }

                let sql1 = 'INSERT INTO employee ('
                for (let i = 0; i < keys.length; i++) {
                    if (i !== 0) {
                        sql1 += ','
                    }
                    sql1 += ' `' + keys[i] + '` ';
                }
                sql1 += ') VALUES ('
                for (let i = 0; i < keys.length; i++) {
                    if (i !== 0) {
                        sql1 += ',';
                    }
                    sql1 += '?';
                }
                sql1 += ')';

                db.query(sql1, values, (err, result) => {
                    if (result) {

                        const sql2 = "INSERT INTO supervisor (emp_id,supervisor_id) VALUES(?,?)";
                        db.query(sql2, [data.emp_id,data.supervisor_id], (err,result) => {
                                if(err){
                                    console.log(err)
                                    return reject(err);
                                }else{
                                    db.commit((err)=>{
                                        if(err){
                                            throw err;
                                        } else {
                                            return resolve(result);
                                        }
                                    });
                                }
                            });

                    } else {
                        console.log(err)
                        return reject(err)
                    }
                });
            });
        }catch (err){
            db.rollback();
            return reject(err);
        }
    });
}

//returns attendace of an employee
function getAttendace(data) {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT emp_id,DATE_FORMAT(date, '%Y-%m-%d') as date,is_present from attendance WHERE emp_id = ? and date BETWEEN ? AND ? "
    db.query(sql,[data.emp_id,data.from,data.to], (err, result) => {
      if (err) {

        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

function getLeaves(data){
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT leave_request.leave_request_id,leave_type.type,DATE_FORMAT(leave_request.leave_begin, '%Y-%m-%d') as leave_begin,DATE_FORMAT(leave_request.leave_end, '%Y-%m-%d') as leave_end,leave_request.reason "+
      "from leave_request,leave_request_state,leave_type "+
      "where "+
      "leave_request.leave_id = leave_type.leave_id and "+
      "leave_request.state_id = leave_request_state.state_id and "+
      "leave_request.state_id = 1 "+
      "and leave_request.emp_id = ? "+
      "and leave_request.leave_begin > ? "+
      "and leave_request.leave_end < ?"
    db.query(sql,[data.emp_id,data.from,data.to], (err, result) => {
      if (err) {

        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

function getEmployeesByIDs(data){
  return new Promise((resolve, reject) => {
    var sql =
      `Select emp_id,first_name,last_name,contact_num,email,job_type_title from employee natural join job_type where ${data.id} = ${data.value} `
    db.query(sql,(err, result) => {
      if (err) {

        return reject(err)
      } else {
        return resolve(result)
      }
    })
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
    getAbsentToday,
    getAbsentTomorrow,
    getWorkingToday,
    getLeaveTypesCount,
    getAttendanceNotMarked,
    getSupervisorByEmpId,
    getJobTypes,
    getEmployeeFull,
    getDataTypes,
    getOneEmployeesFull,
    getSupervisorId,
    getleaveConfig,
    getAttendace,
    getLeaves,
    getEmployeesByIDs,

    updateEmployee,
    addEmployee,
    addAttendance,
    deleteEmployee,
    addColumn,
    dpUpload,
    addSupervisor,
    updateSupervisor,
    deleteColumns,
    updateleaveConfig,
    editEmployee,
    addEmployeeTransaction
}

