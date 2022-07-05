const supervisorModal = require("../models/supervisorModal");

const getRequests = async (req, res) => {
  await supervisorModal
    .getRequests(req.params.empId)
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

const approveRequest = async (req, res) => {
  await supervisorModal
    .approveRequest(req.body)
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

const rejectRequest = async (req, res) => {
  await supervisorModal
    .rejectRequest(req.body)
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

const getAbsentToday = async (req, res) => {
  await supervisorModal
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
  await supervisorModal
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
  await supervisorModal
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
  await supervisorModal
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
  getRequests,
  approveRequest,
  rejectRequest,
  getAbsentToday,
  getAbsentTomorrow,
  getWorkingToday,
  getLeaveTypesCount,
};
