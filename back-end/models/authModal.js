const { json } = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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
                db.query(sql2,(err,result) =>{
                    isLoginIn = result.find((element) => {
                        return element.emp_id === emp_id;
                    });
                    if(isLoginIn === undefined){
                        bcrypt.hash(password, 8, function (err, hash) {
                            db.query(
                                "INSERT INTO login (emp_id,password) VALUES (?, ?)",
                                [emp_id, hash],
                                function (err, result) {
                                    if (result) {
                                        return resolve(result);
                                    } else {
                                        return reject(err);
                                    }
                                }
                            );
                        });
                    }else{
                        return resolve("already exist")
                    }
                })

            } else {
                return resolve("employee not found");
            }
        });
    });
}

// function login(employee){
//     const { empId, password} = employee;
//     return new Promise((resolve, reject) => {
//         var sql = "SELECT emp_id, password FROM login";

//         db.query(sql,(err, result) => {
//             isUserIn = result.find((element) => {
//                 return element.emp_id === empId;
//               });
//               if (isUserIn === undefined) {
//                 return reject("User Not found");
//               } 
//               if (isUserIn.emp_id) {
//                 let qry = "SELECT password,type_id FROM employee NATURAL JOIN login WHERE emp_id = ?";
//                 db.query(qry, [empId], (err, result) => {
//                   //   bcrypt.hash(password, saltRounds, function (err, hash) {
//                   bcrypt.compare(password, result[0].password, function (err, result) {
//                     if (result) {
//                       const token = JWT.sign(
//                         { emp_id, type, ID: isUserIn.ID },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {
//                           expiresIn: "2d",
//                         }
//                       );
//                       // const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
//                       // console.log(user);
//                       return resolve(token);
//                     } else {
//                       return reject(err);
//                     }
//                   });
//                   //   });   
//                 });
//               }              
              
//         });
//     });
// }




module.exports = {signupUser};
