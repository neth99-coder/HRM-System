const hrManagerModal= require("../models/hrManagerModal");


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

  module.exports = {getAbsentToday, getAbsentTomorrow, getWorkingToday, getLeaveTypesCount}