const express = require("express");
const router = express.Router();
const hrManagerController = require("../controllers/hrManagerController");

router.get("/getDepartments",hrManagerController.getDepartments);
router.get("/getTypes",hrManagerController.getTypes);
router.get("/getStatus",hrManagerController.getStauts);
router.get("/getPaygrades",hrManagerController.getPaygrades);
router.get("/getemployee/:empId",hrManagerController.getEmployee);
router.get("/getEmployeeByDeptId/:deptId",hrManagerController.getEmployeeByDeptId);
router.get("/getEmployeeByEmpIdDeptId",hrManagerController.getEmployeeByEmpIdDeptId);
router.get("/getemployees",hrManagerController.getEmployees);
router.get("/getemployeeDepartment/:empId",hrManagerController.getEmployeeDepartment);
router.get("/getemployeeType/:empId",hrManagerController.getEmployeeType);
router.get("/getEmployeeIds",hrManagerController.getEmployeeIds);
router.get("/getAbsentToday", hrManagerController.getAbsentToday);
router.get("/getAbsentTomorrow", hrManagerController.getAbsentTomorrow);
router.get("/getWorkingToday", hrManagerController.getWorkingToday);
router.get("/getLeaveTypesCount", hrManagerController.getLeaveTypesCount);

router.post("/updateEmployee",hrManagerController.updateEmployee);
router.post("/addEmployee",hrManagerController.addEmployee);
router.post("/deleteEmployee",hrManagerController.deleteEmployee);


module.exports = router;