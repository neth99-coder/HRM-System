import {React} from "react";
import AddNewComponent from "./AddNewComponent/AddNewComponent";
import {useEffect, useState} from "react";
import Axios from "axios";
import {Spinner} from "react-bootstrap";
import styles from "../RequestPage/RequestPage.module.css";

function AddNewEmployeePage(props){

    const [isLoading, setIsLoading] = useState(true);
    const [dataTypes,setDataTypes] = useState([]);
    const [employeeFull,setEmployeeFull] =useState({});

    useEffect(()=>{
        setIsLoading(true);

        const findEmployeeFull = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getOneEmployeesFull").then(
                (res) => {
                    setEmployeeFull(res.data.result[0]);
                }
            );
        };
        findEmployeeFull();

        const findDataTypes = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getDataTypes").then(
                (res) => {
                    setDataTypes(res.data.result);
                }
            );
        };
        findDataTypes();

        setIsLoading(false);
    },[]);

    return(
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <AddNewComponent dataTypes = {dataTypes} employeeFull={employeeFull} />
            )}
        </div>
    )
}

export default AddNewEmployeePage;