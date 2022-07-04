const { json } = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = {signupUser};
