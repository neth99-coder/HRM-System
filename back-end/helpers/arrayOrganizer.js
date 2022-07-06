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

function attendanceArray(sqlArray){

  var result = {}
  sqlArray?.map((emp)=>{
    result[emp.emp_id] = false;
  });

  resultArray = [sqlArray,result]
  return resultArray;
}

function insertQuery(data){

    const department = data.department;
    const attendance = data.result;
    const allArray = data.all;
    var filteredAllArray = [];
    var filteredArray = [];
    var sql = 'INSERT INTO  attendance(emp_id,date,is_present) VALUES '

    filteredAllArray = allArray.filter((employee) => {
      return employee.name === department 
    })

    // filteredArray = attendance.forEach(element => {
    //   console.log(element)
    // });
    
    filteredAllArray.map((employee)=>{
      filteredArray.push({'emp_id':employee.emp_id, is_present: attendance[employee.emp_id] })
    })
   
   // return filteredArray
   const today = "CURDATE()";
  

   filteredArray.map((cur)=>{
    sql += '("' + cur.emp_id + '",' + today + ',' + cur.is_present + '),' ;
   })



   return sql.substring(0,sql.length-1);




}

module.exports = {todayLeaveArray, todayWorkingArray, attendanceArray, insertQuery};
