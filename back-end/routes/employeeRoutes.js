const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/getemployee/:empId",employeeController.getEmployee);   // url -> localhost:3001/api/employee/getemployee
router.get("/getemployees",employeeController.getEmployees); // url -> localhost:3001/api/employee/getemployees
router.get("/getLeaveTypes",employeeController.getLeaveTypes);
router.get("/getLeaveRequests/:empId",employeeController.getLeaveRequests);
router.get("/getEmployeeByDeptId/:deptId",employeeController.getEmployeeByDeptId);
router.get("/getEmployeeByEmpIdDeptId/:empId:deptId",employeeController.getEmployeeByEmpIdDeptId);

router.post("/addLeaveRequest",employeeController.addLeaveRequest);
module.exports = router;