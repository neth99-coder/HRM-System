import {React,useEffect, useState} from "react";
import styles from "./CompanyCard.module.css";
import Axios from 'axios';
import authService from "../../../services/auth.service";

function CompanyCard(props) {

  const [companyDetails, setCompanyDetails] = useState([]);

  useEffect(() => {
    const load =  ()=>{
       Axios.get('http://localhost:3001/api/admin/getCompanyDetails', {
            headers: { 'x-auth-token': authService.getUserToken() },
          }).then((res) => {
            setCompanyDetails(res.data.result)
            console.log(res.data.result.logo)

          })
    }

    load()
}, [])
  return (
    <div className={styles["company-card"]}>
      <img
        className={styles["company-logo"]}
        src={require(`../../../Images/${props.companyDetails.logo}`)}
        alt={`${companyDetails.name} logo`}
      />

      <div className={styles["company-details"]}>
        <h2>{companyDetails.name}</h2>
        <h3>{companyDetails.addressLine1}</h3>
        <h3>{companyDetails.addressLine2}</h3>
      </div>
    </div>
  );
}

export default CompanyCard;
