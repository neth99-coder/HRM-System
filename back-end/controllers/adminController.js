const hrManagerModal = require("../models/adminModal");

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

const getJobTypes = async (req,res) => {
    await hrManagerModal
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

const getStatus = async (req,res) => {
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


    const getEmployeeFull = async (req,res) =>{
        await hrManagerModal
            .getEmployeeFull(req.params.empId)
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
    
    const dpUpload = async (req,res)=>{
        try{
            await hrManagerModal
                .dpUpload(req.files.file,req.body.fileName);
            res.json({ success: true });
        }catch (err){
            res.json({
                success: false,
                err,
            });
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
        addEmployee
      }