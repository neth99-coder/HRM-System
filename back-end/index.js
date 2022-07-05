const express = require('express');
const path = require('path')
require('dotenv').config();
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload")
const employeeRoutes = require("./routes/employeeRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const hrmanagerRoutes = require("./routes/hrManagerRoutes");
const authRoutes = require("./routes/authRoutes");
const authToken = require('./middleware/authToken');


app.use(express.json());
app.use(cors());
require('dotenv').config();
app.use(express.static('public'));
app.use(fileUpload());

app.use("/api/employee", authToken,employeeRoutes);
app.use("/api/supervisor", authToken,supervisorRoutes);
app.use("/api/hrManager", authToken, hrmanagerRoutes);
app.use("/api/auth",authRoutes);

// app.use("/api/employee",employeeRoutes);
// app.use("/api/supervisor",supervisorRoutes);
// app.use("/api/hrManager", hrmanagerRoutes);
// app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("Listening to port number "+ PORT);
}); 