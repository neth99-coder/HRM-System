const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/getemployee/:empId",employeeController.getEmployee);   // url -> localhost:3001/api/employee/getemployee
router.get("/getemployees",employeeController.getEmployees); // url -> localhost:3001/api/employee/getemployees

module.exports = router;