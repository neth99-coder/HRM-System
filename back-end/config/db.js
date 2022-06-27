const mysql = require("mysql");
const config = require("config");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: config.get("db_username"),
  password: config.get("db_password"),
  database: "hrm_db"
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Mysql connected!!");
  }
});
module.exports = connection;