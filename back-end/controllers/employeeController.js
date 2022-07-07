const employeeModal = require('../models/employeeModal')

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

  const file = req.files.file;
  file.mv(`${__dirname}/../public/attachments/${file.name}`, (err) => {
    if (err) {
      console.error(err)
    }
  })

  await employeeModal
    .addLeaveRequest({ ...req.body, attachment: req.files.file.name })
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
  file.mv(`${__dirname}/../public/images/${file.name}`, (err) => {
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

module.exports = {
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
}
