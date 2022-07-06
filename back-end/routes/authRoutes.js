const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signupUser",authController.signupUser);
router.post("/loginUser",authController.loginUser);

module.exports = router;