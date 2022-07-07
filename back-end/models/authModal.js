const { json } = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const waterfall = require("async-waterfall");

//Signup employees
function signupUser(obj) {
  const { emp_id, password } = obj;
  return new Promise((resolve, reject) => {
    var sql = "SELECT emp_id FROM employee";

    var isUserIn;
    db.query(sql, (err, result) => {
      isUserIn = result.find((element) => {
        return element.emp_id === emp_id;
      });
      if (isUserIn !== undefined) {
        var sql2 = "SELECT emp_id FROM login";
        var isLoginIn;
        db.query(sql2, (err, result) => {
          isLoginIn = result.find((element) => {
            return element.emp_id === emp_id;
          });
          if (isLoginIn === undefined) {
            bcrypt.hash(password, 8, function (err, hash) {
              db.query(
                "INSERT INTO login (emp_id,password) VALUES (?, ?)",
                [emp_id, hash],
                function (err, result) {
                  if (result) {
                    console.log("success")
                    return resolve(result);
                  } else {
                    console.log(err)
                    return reject(err);
                  }
                }
              );
            });
          } else {
            return resolve("already exist");
          }
        });
      } else {
        return resolve("employee not found");
      }
    });
  });
}

function loginUser(employee) {
  const empId = employee.empId;
  const password = employee.password;
  return new Promise((resolve, reject) => {
    var sql = "SELECT emp_id,password FROM login NATURAL JOIN employee";

    db.query(sql, (err, result) => {
      isUserIn = result.find((element) => {
        return element.emp_id === empId;
      });
      if (isUserIn === undefined) {
        return reject("User Not found");
      }
      if (isUserIn.emp_id) {

        let sql = "SELECT password,type_id,first_name,last_name,profile_picture FROM employee NATURAL JOIN login WHERE emp_id = ?";
        db.query(sql, [empId], (err, result) => {

          bcrypt.compare(password, result[0].password, function (err, result1) {
            if (result1) {
                const empType = result[0].type_id;
                
                
          const token = JWT.sign(
            { id:empId, type:empType},
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "2d",
            }
          );

         return resolve(token);
       // console.log(token);
        } else {
          return reject(err);
        }
          });

        });
      }
    });
    // console.log(empId,password)
  });
}

module.exports = { signupUser, loginUser };
