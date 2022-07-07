const express = require("express");
const router = express.Router();
const hrManagerController = require("../controllers/hrManagerController");

router.get("/getDepartments",hrManagerController.getDepartments);
router.get("/getJobTypes",hrManagerController.getJobTypes);
router.get("/getTypes",hrManagerController.getTypes);
router.get("/getSupervisorId",hrManagerController.getSupervisorId);
router.get("/getStatus",hrManagerController.getStauts);
router.get("/getPaygrades",hrManagerController.getPaygrades);
router.get("/getemployee/:empId",hrManagerController.getEmployee);
router.get("/getemployeeFull/:empId",hrManagerController.getEmployeeFull);
router.get("/getSupervisorByEmpId/:empId",hrManagerController.getSupervisorByEmpId);
router.get("/getEmployeeByDeptId/:deptId",hrManagerController.getEmployeeByDeptId);
router.get("/getEmployeeByEmpIdDeptId",hrManagerController.getEmployeeByEmpIdDeptId);
router.get("/getemployees",hrManagerController.getEmployees);
router.get("/getOneEmployeesFull",hrManagerController.getOneEmployeesFull);
router.get("/getDataTypes",hrManagerController.getDataTypes);
router.get("/getemployeeDepartment/:empId",hrManagerController.getEmployeeDepartment);
router.get("/getemployeeType/:empId",hrManagerController.getEmployeeType);
router.get("/getEmployeeIds",hrManagerController.getEmployeeIds);
router.get("/getAbsentToday", hrManagerController.getAbsentToday);
router.get("/getAbsentTomorrow", hrManagerController.getAbsentTomorrow);
router.get("/getWorkingToday", hrManagerController.getWorkingToday);
router.get("/getLeaveTypesCount", hrManagerController.getLeaveTypesCount);
router.get("/getAttendanceNotMarked", hrManagerController.getAttendanceNotMarked);

router.post("/updateEmployee",hrManagerController.updateEmployee);
router.post("/updateSupervisor",hrManagerController.updateSupervisor);
router.post("/addEmployee",hrManagerController.addEmployee);
router.post("/addAttendance",hrManagerController.addAttendance);
router.post("/deleteEmployee",hrManagerController.deleteEmployee);
router.post("/addSupervisor",hrManagerController.addSupervisor);
router.post("/addColumn",hrManagerController.addColumn);
router.post("/dpUpload",hrManagerController.dpUpload);



module.exports = router;