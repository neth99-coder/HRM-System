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

module.exports = { getRequests, approveRequest, rejectRequest };
