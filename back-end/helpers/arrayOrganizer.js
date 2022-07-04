const { json } = require("express");

function todayLeaveArray(sqlArray) {
  var medical = 0;
  var casual = 0;
  var annual = 0;

  sqlArray?.map((cur) => {
    switch (cur.type) {
      case "Medical":
        medical += cur.leave_type_count;
        break;
      case "Casual":
        casual += cur.leave_type_count;
        break;
      case "Annual":
        annual += cur.leave_type_count;
        break;
    }
  });

  return [
    ["Leave Type", "Number of Leaves"],
    ["Medical", medical],
    ["Casual", casual],
    ["Annual", annual],
  ];
}

function todayWorkingArray(sqlArray){

  var accounting = 0;
  var hr = 0;
  var it = 0;
  var security = 0;

  sqlArray?.map((cur) => {
    switch (cur.name) {
      case "Accounting":
        accounting += cur.emp_count;
        break;
      case "Human Resource":
        hr += cur.emp_count;
        break;
      case "IT":
        it += cur.emp_count;
        break;
        case "Security":
          security += cur.emp_count;
          break;
    }

  });

  return [
    ["Working Dept", "Number"],
    ["Accounts", accounting],
    ["HR", hr],
    ["IT", it],
    ["Security", security]
  ];

}

module.exports = {todayLeaveArray, todayWorkingArray};
