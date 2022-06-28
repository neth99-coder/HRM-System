const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const hrManagerRoutes = require("./routes/hrManagerRouter")

app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use("/api/employee",employeeRoutes);
app.use("/api/supervisor",supervisorRoutes);
app.use("/api/hrManager",hrManagerRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("Listening to port number "+ PORT);
}); 