const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController");

router.get('/getRequests/:empId',supervisorController.getRequests);

router.post('/approve',supervisorController.approveRequest);
router.post('/reject',supervisorController.rejectRequest);


module.exports = router;