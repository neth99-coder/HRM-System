import {PAYGRADE} from "./paygrade";

function findPayGradeByID(paygrade_id){
    let payGrade = PAYGRADE.filter((paygrade) => paygrade.paygrade_id === paygrade_id);
    if(payGrade.length === 0){
        return "";
    }else{
        return(payGrade[0].name);
    }
}

export default findPayGradeByID;