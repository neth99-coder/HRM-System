const { json } = require("express");

//function to count remaing leave according to types
//"Maternity"=> 2, "Casual"=> 1, "Annual"=> 3

function getLeaveCounts(emp_arr, paygrade_arr) {
  var leaveCount = { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };
  var allowedCount =  { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };

  emp_arr.map((cur) => {
    //leaveCount += cur['difference']
    switch (cur["leave_id"]) {
      case 1:
        leaveCount["Casual"] += cur["difference"];
        break;
      case 2:
        leaveCount["Maternity"] += cur["difference"];
        break;
      case 3:
        leaveCount["Annual"] += cur["difference"];
        break;
        case 4:
          leaveCount["No Pay"] += cur["difference"];
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
            allowedCount["Maternity"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
          case 4:
            allowedCount["No Pay"] += cur["num_of_leaves"];
          break;
      }
  });

  return [{
    leaveCount: leaveCount,
    allowedCount: allowedCount,
    remaining: { "Maternity": allowedCount["Maternity"] - leaveCount["Maternity"], "Casual":allowedCount["Casual"] - leaveCount["Casual"] , "Annual": allowedCount["Annual"] - leaveCount["Annual"],"No Pay": allowedCount["No Pay"] - leaveCount["No Pay"] }
  }];
}

function getLeaveCountsEmpty(arr){
  var leaveCount = { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };
  var allowedCount =  { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };
  arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Maternity"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
          case 4:
            allowedCount["No Pay"] += cur["num_of_leaves"];
          break;
      }
  });

  return [{
    leaveCount: leaveCount,
    allowedCount: allowedCount,
    remaining: { "Maternity": allowedCount["Maternity"] - leaveCount["Maternity"], "Casual":allowedCount["Casual"] - leaveCount["Casual"] , "Annual": allowedCount["Annual"] - leaveCount["Annual"],"No Pay": allowedCount["No Pay"] - leaveCount["No Pay"] }
  }];
  
}


function getLeavesForChart(emp_arr, paygrade_arr) {
  var leaveCount = { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };
  var allowedCount =  { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };

  emp_arr.map((cur) => {
    //leaveCount += cur['difference']
    switch (cur["leave_id"]) {
      case 1:
        leaveCount["Casual"] += cur["difference"];
        break;
      case 2:
        leaveCount["Maternity"] += cur["difference"];
        break;
      case 3:
        leaveCount["Annual"] += cur["difference"];
        break;
        case 4:
          leaveCount["No Pay"] += cur["difference"];
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
            allowedCount["Maternity"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
          case 4:
            allowedCount["No Pay"] += cur["num_of_leaves"];
          break;
      }
  });

  const result = [
    {allowed: allowedCount.Maternity, taken: leaveCount.Maternity, remaining: allowedCount["Maternity"] - leaveCount["Maternity"], title: "Maternity"},
    {allowed: allowedCount.Casual, taken: leaveCount.Casual, remaining: allowedCount["Casual"] - leaveCount["Casual"], title: "Casual" },
    {allowed: allowedCount.Annual, taken: leaveCount.Annual, remaining: allowedCount["Annual"] - leaveCount["Annual"], title: "Annual" },
    {allowed: allowedCount["No Pay"] , taken: leaveCount["No Pay"], remaining: allowedCount["No Pay"] - leaveCount["No Pay"], title: "No Pay"}
  ]
  

  return result;
}

function getLeavesForChartEmpty(arr){
  var leaveCount = { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0};
  var allowedCount = { "Maternity": 0, "Casual": 0, "Annual": 0, "No Pay": 0 };
  arr.map((cur) => {
    //allowedCount += cur["num_of_leaves"];
    switch (cur["leave_id"]) {
        case 1:
            allowedCount["Casual"] += cur["num_of_leaves"];
          break;
        case 2:
            allowedCount["Maternity"] += cur["num_of_leaves"];
          break;
        case 3:
            allowedCount["Annual"] += cur["num_of_leaves"];
          break;
          case 4:
            allowedCount["No Pay"] += cur["num_of_leaves"];
          break;
      }
  });

  const result = [
    {allowed: allowedCount.Maternity, taken: leaveCount.Maternity, remaining: allowedCount["Maternity"] - leaveCount["Maternity"], title: "Maternity"},
    {allowed: allowedCount.Casual, taken: leaveCount.Casual, remaining: allowedCount["Casual"] - leaveCount["Casual"], title: "Casual" },
    {allowed: allowedCount.Annual, taken: leaveCount.Annual, remaining: allowedCount["Annual"] - leaveCount["Annual"], title: "Annual" },
    {allowed: allowedCount["No Pay"] , taken: leaveCount["No Pay"], remaining: allowedCount["No Pay"] - leaveCount["No Pay"], title: "No Pay"}
  ]

  return result;
}



module.exports = { getLeaveCounts, getLeavesForChart, getLeaveCountsEmpty, getLeavesForChartEmpty};
