const express = require('express');
const path = require('path')
require('dotenv').config();
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload")
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const hrmanagerRoutes = require("./routes/hrManagerRoutes");
const authRoutes = require("./routes/authRoutes");
const authToken = require('./middleware/authToken');
const adminAuthToken = require("./middleware/adminAuthToekn");
const hrmAuthToken = require("./middleware/hrAuthToken");
const supervisorAuthToken = require("./middleware/supervisorAuthToken");
const employeeAuthToken = require("./middleware/employeeAuthToken");


app.use(express.json());
app.use(cors());
require('dotenv').config();
app.use(express.static('public'));
app.use(fileUpload());

app.use("/api/admin", adminAuthToken,adminRoutes);
app.use("/api/employee", employeeAuthToken,employeeRoutes);
app.use("/api/supervisor", supervisorAuthToken,supervisorRoutes);
app.use("/api/hrManager", hrmAuthToken, hrmanagerRoutes);
app.use("/api/auth",authRoutes);

// app.use("/api/employee",employeeRoutes);
// app.use("/api/supervisor",supervisorRoutes);
// app.use("/api/hrManager", hrmanagerRoutes);
// app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("Listening to port number "+ PORT);
}); 