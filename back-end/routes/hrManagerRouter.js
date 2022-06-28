const express = require("express");
const router = express.Router();
const hrManagerController = require("../controllers/hrManagerController");

router.get("/getAbsentToday", hrManagerController.getAbsentToday);
router.get("/getAbsentTomorrow", hrManagerController.getAbsentTomorrow);
router.get("/getWorkingToday", hrManagerController.getWorkingToday);
router.get("/getLeaveTypesCount", hrManagerController.getLeaveTypesCount);

module.exports = router;
