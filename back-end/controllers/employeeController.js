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
  const getLeaveTypes = async (req,res) =>{
    await employeeModal
    .getLeaveTypes()
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

  const getLeaveRequests = async (req,res) =>{
    await employeeModal
    .getLeaveRequests(req.params.empId)
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

  const addLeaveRequest = async (req,res)=>{
    await employeeModal
    .addLeaveRequest(req.body)
    .then((result) => {
      res.json({ success: true, result });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });  
  }

  const getEmployeeByDeptId = async (req,res) =>{
    await employeeModal
        .getEmployeeByDeptId(req.params.deptId)
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

  const getEmployeeByEmpIdDeptId = async (req,res) =>{
    await employeeModal
        .getEmployeeByEmpIdDeptId(req.params.empId,req.params.deptId)
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
      getEmployees,
      getLeaveTypes,
      getLeaveRequests,
      addLeaveRequest,
      getEmployeeByDeptId,
      getEmployeeByEmpIdDeptId
  }