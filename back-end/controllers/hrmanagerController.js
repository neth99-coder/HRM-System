const hrmanagerModal = require("../models/hrmanagerModal");
const employeeModal = require("../models/employeeModal");

const getDepartments = async (req,res) => {
    await hrmanagerModal
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

const getTypes = async (req,res) => {
    await hrmanagerModal
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
    await hrmanagerModal
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
    await hrmanagerModal
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

    const getEmployee = async (req,res) =>{
        await hrmanagerModal
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
            .getEmployeeByEmpIdDeptId(req.query.empId,req.query.deptId)
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

const getEmployeeDepartment = async (req,res) =>{
    await hrmanagerModal.
    getEmployeeDepartment(req.params.empId)
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

const getEmployeeType = async (req,res) =>{
    await hrmanagerModal.
    getEmployeeType(req.params.empId)
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

const updateEmployee = async (req,res)=>{
    await hrmanagerModal
        updateEmployee(req.body)
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

module.exports = {
    getDepartments,
    getTypes,
    getStauts,
    getPaygrades,
    getEmployee,
    getEmployeeByDeptId,
    getEmployeeByEmpIdDeptId,
    getEmployees,
    getEmployeeDepartment,
    getEmployeeType,

    updateEmployee

}