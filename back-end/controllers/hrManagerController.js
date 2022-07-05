const hrManagerModal = require("../models/hrManagerModal");

const getDepartments = async (req,res) => {
    await hrManagerModal
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
    await hrManagerModal
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
    await hrManagerModal
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
    await hrManagerModal
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
        await hrManagerModal
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
        await hrManagerModal
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
        await hrManagerModal
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
    await hrManagerModal
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
    await hrManagerModal.
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
    await hrManagerModal.
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

const getEmployeeIds = async (req,res) =>{
    await hrManagerModal.
    getEmployeeIds()
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
    await hrManagerModal
        .updateEmployee(req.body)
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

const addEmployee = async (req,res)=>{
    await hrManagerModal
        .addEmployee(req.body)
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

const deleteEmployee = async (req,res)=>{
    await hrManagerModal
        .deleteEmployee(req.body)
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

const getAbsentToday = async (req, res) => {
    await hrManagerModal
        .getAbsentToday()
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
};

const getAbsentTomorrow = async (req, res) => {
    await hrManagerModal
        .getAbsentTomorrow()
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
};

const getWorkingToday = async (req, res) => {
    await hrManagerModal
        .getWorkingToday()
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
};

const getLeaveTypesCount = async (req, res) => {
    await hrManagerModal
        .getLeaveTypesCount()
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
};

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
    getEmployeeIds,
    getAbsentToday,
    getAbsentTomorrow,
    getWorkingToday,
    getLeaveTypesCount,

    updateEmployee,
    addEmployee,
    deleteEmployee

}