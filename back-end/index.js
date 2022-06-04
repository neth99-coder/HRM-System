const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");


app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use("/api/employee",employeeRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
    console.log("Listening to port number "+ PORT);
}); 