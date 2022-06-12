import {React,useState, useEffect} from "react";
import Axios from 'axios';
import styles from "./Table.module.css";
import dp from "../../Images/profile-pic.JPG";     // TODO: change to correct dp from db
import Request from "./Request";

import {CgAttachment} from 'react-icons/cg';
import { Spinner } from "react-bootstrap";


const Table = () => {

    const [requests,setRequests] = useState([]);
    const empId = "190110V";
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{

      setIsLoading(true);
        const getRequests = async()=>{
            await Axios.get("http://localhost:3001/api/supervisor/getRequests/"+empId).then((res)=>{
                //console.log(res.data.result);
                setRequests(res.data.result);
                setIsLoading(false);
            });
        }
        getRequests();


    },[])

  return (
    <div>
                  {isLoading ? (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      <> 
      <div className={` col align-self-start h1`} style={{marginLeft:'10px'}}>LEAVE REQUESTS</div>

      <table
        className={`${styles["table"]} table table-dark table-striped table-hover`}
      >
        <thead>

          <div className={`${styles['header']} row border border-3 border-light`}>
            <div className="col text-center">Employee Name</div>
            <div className="col text-center">Leave Type</div>
            <div className="col text-center">From - To</div>
            <div className="col-3 text-center">Reason</div>
            <div className="col-1 text-center">{<CgAttachment/>}</div>
            <div className="col text-center"></div>
            

          </div>
        </thead>
        <tbody>
          {requests?.map((cur, index) => {
            return (
              <tr>
                    <Request cur={cur} dp={dp}/>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>)}
    </div>
  );
};

export default Table;
