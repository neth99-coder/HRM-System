const employeeModal = require("../models/employeeModal");

const getEmployee = async (req,res) =>{
    await employeeModal
    .getEmployee(req.params.empId)
    .then((result)=>{
      res.json({
        success: true,
        result,
      });
    })
    .catch((err)=>{
      res.json({
        success: false,
        err,
      });
    });
  };

  const getEmployees = async (req,res) =>{
    await employeeModal
    .getEmployees()
    .then((result)=>{
      res.json({
        success: true,
        result,
      });
    })
    .catch((err)=>{
      res.json({
        success: false,
        err,
      });
    });
  };

  module.exports = {
      getEmployee,
      getEmployees
  }