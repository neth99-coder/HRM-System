const adminModal = require('../models/adminModal')
const fs = require('fs')

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
  if( req.files){
    const file = req.files.file 
    file.mv(`${__dirname}/../public/profilePictures/${file.name}`, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }else{
    delete req.body.file  
  }

  await adminModal
    .addEmployee({ ...req.body, profile_picture: req.files ?req.files.file.name:"default.jpg" })
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

const getDataTypes = async (req, res) => {
  await adminModal
    .getDataTypes()
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

const getEmployeewithUserType = async (req, res) => {
  await adminModal
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

const getEmployeeIds = async (req, res) => {
  await adminModal
    .getEmployeeIds()
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


const updateCompanyDetails = (req, res) => {
  try {
    // convert JSON object to a string
    const data = JSON.stringify(req.body, null, 4)

    // write file to disk
    fs.writeFileSync(`${__dirname}/../company.json`, data, 'utf8')

    res.json({
      success: true,
    })
  } catch (err) {
    res.json({
      success: false,
      err,
    })   
  }
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
  deleteEmployee,
  getDataTypes,
  getEmployeewithUserType,
  getEmployeeIds,
  updateCompanyDetails
}
