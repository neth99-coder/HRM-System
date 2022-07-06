const { json } = require("express");

//function to count remaing leave according to types
//"Medical"=> 2, "Casual"=> 1, "Annual"=> 3

function getLeaveCounts(emp_arr, paygrade_arr) {
  var leaveCount = { "Medical": 0, "Casual": 0, "Annual": 0 };
  var allowedCount = { "Medical": 0, "Casual": 0, "Annual": 0 };

  emp_arr.map((cur) => {
    //leaveCount += cur['difference']
    switch (cur["leave_id"]) {
      case 1:
        leaveCount["Casual"] += cur["difference"];
        break;
      case 2:
        leaveCount["Medical"] += cur["difference"];
        break;
      case 3:
        leaveCount["Annual"] += cur["difference"];
        break;
    }
  });

  paygrade_arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Medical"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
      }
  });

  return [{
    leaveCount: leaveCount,
    allowedCount: allowedCount,
    remaining: { "Medical": allowedCount["Medical"] - leaveCount["Medical"], "Casual":allowedCount["Casual"] - leaveCount["Casual"] , "Annual": allowedCount["Annual"] - leaveCount["Annual"] }
  }];
}

function getLeaveCountsEmpty(arr){
  var leaveCount = { "Medical": 0, "Casual": 0, "Annual": 0 };
  var allowedCount = { "Medical": 0, "Casual": 0, "Annual": 0 }; 
  arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Medical"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
      }
  });

  return [{
    leaveCount: leaveCount,
    allowedCount: allowedCount,
    remaining: { "Medical": allowedCount["Medical"] - leaveCount["Medical"], "Casual":allowedCount["Casual"] - leaveCount["Casual"] , "Annual": allowedCount["Annual"] - leaveCount["Annual"] }
  }];
  
}


function getLeavesForChart(emp_arr, paygrade_arr) {
  var leaveCount = { "Medical": 0, "Casual": 0, "Annual": 0 };
  var allowedCount = { "Medical": 0, "Casual": 0, "Annual": 0 };

  emp_arr.map((cur) => {
    //leaveCount += cur['difference']
    switch (cur["leave_id"]) {
      case 1:
        leaveCount["Casual"] += cur["difference"];
        break;
      case 2:
        leaveCount["Medical"] += cur["difference"];
        break;
      case 3:
        leaveCount["Annual"] += cur["difference"];
        break;
    }
  });

  paygrade_arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Medical"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
      }
  });

  const result = [
    {allowed: allowedCount.Medical, taken: leaveCount.Medical, remaining: allowedCount["Medical"] - leaveCount["Medical"], title: "Medical"},
    {allowed: allowedCount.Casual, taken: leaveCount.Casual, remaining: allowedCount["Casual"] - leaveCount["Casual"], title: "Casual" },
    {allowed: allowedCount.Annual, taken: leaveCount.Annual, remaining: allowedCount["Annual"] - leaveCount["Annual"], title: "Annual" },
  ]

  return result;
}

function getLeavesForChartEmpty(arr){
  var leaveCount = { "Medical": 0, "Casual": 0, "Annual": 0 };
  var allowedCount = { "Medical": 0, "Casual": 0, "Annual": 0 };
  arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Medical"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
      }
  });

  const result = [
    {allowed: allowedCount.Medical, taken: leaveCount.Medical, remaining: allowedCount["Medical"] - leaveCount["Medical"], title: "Medical"},
    {allowed: allowedCount.Casual, taken: leaveCount.Casual, remaining: allowedCount["Casual"] - leaveCount["Casual"], title: "Casual" },
    {allowed: allowedCount.Annual, taken: leaveCount.Annual, remaining: allowedCount["Annual"] - leaveCount["Annual"], title: "Annual" },
  ]

  return result;
}



module.exports = { getLeaveCounts, getLeavesForChart, getLeaveCountsEmpty, getLeavesForChartEmpty};
