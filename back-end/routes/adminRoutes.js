const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.get("/getDepartments",adminController.getDepartments);
router.get("/getJobTypes",adminController.getJobTypes);
router.get("/getTypes",adminController.getTypes);
router.get("/getStatus",adminController.getStatus);
router.get("/getPaygrades",adminController.getPaygrades);
router.get("/getemployee/:empId",adminController.getEmployee);
router.get("/getemployeeFull/:empId",adminController.getEmployeeFull);
router.get("/getDataTypes",adminController.getDataTypes);

router.post("/updateEmployee",adminController.updateEmployee);
router.post("/addEmployee",adminController.addEmployee);
router.post("/dpUpload",adminController.dpUpload);
router.post('/hr-manager-delete', adminController.deleteEmployee)

module.exports = router