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

  const getEmployeeNameandType = async (req,res) =>{
    await employeeModal
    .getEmployeeNameandType()
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

  const addEmployee = async (req,res) =>{
    await employeeModal
    .addEmployee(req.body)
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
  }

  module.exports = {
      addEmployee,
      getEmployee,
      getEmployees,
      getEmployeeNameandType
  }