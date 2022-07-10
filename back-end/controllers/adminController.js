const adminModal = require('../models/adminModal')

const getDepartments = async (req, res) => {
  await adminModal
    .getDepartments()
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

const getJobTypes = async (req, res) => {
  await adminModal
    .getJobTypes()
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

const getTypes = async (req, res) => {
  await adminModal
    .getTypes()
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

const getStatus = async (req, res) => {
  await adminModal
    .getStatus()
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

const getPaygrades = async (req, res) => {
  await adminModal
    .getPaygrades()
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

const getEmployee = async (req, res) => {
  await adminModal
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

const getEmployeeFull = async (req, res) => {
  await adminModal
    .getEmployeeFull(req.params.empId)
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

const updateEmployee = async (req, res) => {
  await adminModal
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

const addEmployee = async (req, res) => {
  await adminModal
    .addEmployee(req.body)
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

const dpUpload = async (req, res) => {
  try {
    await adminModal.dpUpload(req.files.file, req.body.fileName)
    res.json({ success: true })
  } catch (err) {
    res.json({
      success: false,
      err,
    })
  }
}

const deleteEmployee = async (req, res) => {
  await adminModal
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

module.exports = {
  getEmployee,
  getEmployeeFull,
  getDepartments,
  getJobTypes,
  getTypes,
  getStatus,
  getPaygrades,
  updateEmployee,
  dpUpload,
  addEmployee,
  deleteEmployee
}
