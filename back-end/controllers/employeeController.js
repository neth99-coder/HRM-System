const employeeModal = require('../models/employeeModal')
const fs = require('fs');

const getDepartments = async (req,res) => {
  await employeeModal
      .getDepartments()
      .then((result) => {
        res.json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err,
        });
      });
}

const getSupervisorByEmpId = async (req,res) =>{
  await employeeModal
      .getSupervisorByEmpId(req.params.empId)
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

const getJobTypes = async (req,res) => {
  await employeeModal
      .getJobTypes()
      .then((result) => {

        res.json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err,
        });
      });
}

const getEmployee = async (req, res) => {
  await employeeModal
    .getEmployee(req.params.empId)
    .then((result) => {
      
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getEmployees = async (req, res) => {
  await employeeModal
    .getEmployees()
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}


const getLeaveTypes = async (req, res) => {
  await employeeModal
    .getLeaveTypes()
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getLeaveRequests = async (req, res) => {
  await employeeModal
    .getLeaveRequests(req.params.empId)
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const addLeaveRequest = async (req, res) => {

  if(req.files){
    const file = req.files.file;
    file.mv(`${__dirname}/../public/attachments/${file.name}`, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }
  

  await employeeModal
    .addLeaveRequest({ ...req.body, attachment: req.files ?req.files.file.name : '' })
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getEmployeewithUserType = async (req, res) => {
  await employeeModal
    .getEmployeewithUserType()
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const existingLeaveCount = async (req, res) => {
  await employeeModal
    .existingLeaveCount(req.params.empId)
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const addEmployee = async (req, res) => {
  const file = req.files.file
  file.mv(`${__dirname}/../public/profilePictures/${file.name}`, (err) => {
    if (err) {
      console.error(err)
    }
  })

  await employeeModal
    .addEmployee({ ...req.body, profile_picture: req.files.file.name })
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({
        success: false,
        err,
      })
    })
}

const deleteEmployee = async (req, res) => {
  await employeeModal
    .deleteEmployee(req.body)
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const updateEmployee = async (req, res) => {
  await employeeModal
    .updateEmployee(req.body)
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      console.log(err)
      res.json({
        success: false,
        err,
      })
    })
}

const loadLeaveChart = async (req, res) => {
  await employeeModal
    .loadLeaveChart(req.params.empId)
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getEmployeeByDeptId = async (req, res) => {
  await employeeModal
    .getEmployeeByDeptId(req.params.deptId)
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getEmployeeByEmpIdDeptId = async (req, res) => {
  await employeeModal
    .getEmployeeByEmpIdDeptId(req.params.empId, req.params.deptId)
    .then((result) => {
      res.json({
        success: true,
        result,
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      })
    })
}

const getCompanydetails = (req, res) => {

  try {
    const data =  fs.readFileSync(`${__dirname}/../company.json`, 'utf8')

    // parse JSON string to JSON object
    const result = JSON.parse(data)
    res.json({
      success: true,
      result,
    })
  } catch (err) {
    res.json({
      success: false, 
      err,
    })
  }
}

const getTypes = async (req,res) => {
  await employeeModal
      .getTypes()
      .then((result) => {
        res.json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err,
        });
      });
}

const getStauts = async (req,res) => {
  await employeeModal
      .getStatus()
      .then((result) => {
        res.json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err,
        });
      });
}

const getPaygrades = async (req,res) => {
  await employeeModal
      .getPaygrades()
      .then((result) => {
        res.json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err,
        });
      });
}

module.exports = {
  getDepartments,
  getPaygrades,
  getStauts,
  getTypes,
  getJobTypes,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeewithUserType,
  getEmployee,
  getEmployees,
  getLeaveTypes,
  getLeaveRequests,
  addLeaveRequest,
  getEmployeeByDeptId,
  existingLeaveCount,
  loadLeaveChart,
  getEmployeeByEmpIdDeptId,
  getCompanydetails,
  getSupervisorByEmpId
}
