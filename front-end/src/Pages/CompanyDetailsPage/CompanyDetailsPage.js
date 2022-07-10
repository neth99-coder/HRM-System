import {React} from "react";
import CompanyDetailsComponent from "./CompanyDetailsComponent/CompanyDetailsComponent";

function CompanyDetailsPage(props){

    return(
        <div>
            <CompanyDetailsComponent companyDetails={props.companyDetails}  setCompanyDetails={props.setCompanyDetails}/>
        </div>
    )
}


export default CompanyDetailsPage;