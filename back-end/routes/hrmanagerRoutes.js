const express = require("express");
const router = express.Router();
const hrmanagerController = require("../controllers/hrmanagerController");

router.get("/getDepartments",hrmanagerController.getDepartments);
router.get("/getTypes",hrmanagerController.getTypes);
router.get("/getStatus",hrmanagerController.getStauts);
router.get("/getPaygrades",hrmanagerController.getPaygrades);
router.get("/getemployee/:empId",hrmanagerController.getEmployee);
router.get("/getEmployeeByDeptId/:deptId",hrmanagerController.getEmployeeByDeptId);
router.get("/getEmployeeByEmpIdDeptId",hrmanagerController.getEmployeeByEmpIdDeptId);
router.get("/getemployees",hrmanagerController.getEmployees);
router.get("/getemployeeDepartment/:empId",hrmanagerController.getEmployeeDepartment);
router.get("/getemployeeType/:empId",hrmanagerController.getEmployeeType);
router.get("/getEmployeeIds",hrmanagerController.getEmployeeIds);

router.post("/updateEmployee",hrmanagerController.updateEmployee);
router.post("/addEmployee",hrmanagerController.addEmployee);
router.post("/deleteEmployee",hrmanagerController.deleteEmployee);


module.exports = router;