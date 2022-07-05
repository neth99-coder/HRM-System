const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController");

router.get('/getRequests/:empId',supervisorController.getRequests);
router.get('/getAbsentToday',supervisorController.getAbsentToday);
router.get('/getAbsentTomorrow',supervisorController.getAbsentTomorrow);
router.get('/getWorkingToday',supervisorController.getWorkingToday);
router.get('/getLeaveTypesCount',supervisorController.getLeaveTypesCount);

router.post('/approve',supervisorController.approveRequest);
router.post('/reject',supervisorController.rejectRequest);


module.exports = router;