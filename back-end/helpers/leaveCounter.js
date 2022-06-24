const { json } = require("express");


function getLeaveCounts(emp_arr,paygrade_arr){

    var leaveCount  = 0 ;
    var allowedCount  = 0 ;

    emp_arr.map((cur)=>{
        leaveCount += cur['difference']
    });

    paygrade_arr.map((cur)=>{
        allowedCount += cur["num_of_leaves"]
    })
    return {"leaveCount": leaveCount, "allowedCount": allowedCount, "remaining": (allowedCount - leaveCount)}
}


module.exports = {getLeaveCounts}
