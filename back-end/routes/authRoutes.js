const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signupUser",authController.signupUser);

module.exports = router;