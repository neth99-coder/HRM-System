const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')


router.get("/getemployee/:empId",employeeController.getEmployee);   // url -> localhost:3001/api/employee/getemployee
router.get("/getemployees",employeeController.getEmployees); // url -> localhost:3001/api/employee/getemployees
router.get("/getLeaveTypes",employeeController.getLeaveTypes);
router.get("/getLeaveRequests/:empId",employeeController.getLeaveRequests); 
router.get("/existingLeaveCount/:empId",employeeController.existingLeaveCount);
router.get("/leaveChart/:empId",employeeController.loadLeaveChart);
router.get("/getEmployeeByDeptId/:deptId",employeeController.getEmployeeByDeptId);
router.get("/getEmployeeByEmpIdDeptId/:empId:deptId",employeeController.getEmployeeByEmpIdDeptId);
router.get('/getemployeetypes', employeeController.getEmployeewithUserType)
router.get("/getCompanyDetails",employeeController.getCompanydetails);

router.post('/addemployee', employeeController.addEmployee)
router.post('/updateemployee', employeeController.updateEmployee)
router.post('/hr-manager-delete', employeeController.deleteEmployee)
router.post('/addLeaveRequest', employeeController.addLeaveRequest)
module.exports = router
