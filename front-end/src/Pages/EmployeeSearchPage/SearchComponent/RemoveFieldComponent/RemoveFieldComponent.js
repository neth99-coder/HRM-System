import {React, useState} from "react";
import {Form, FormGroup} from "reactstrap";
import Styles from "./RemoveFieldComponent.module.css";
import Axios from "axios";
import authService from "../../../../services/auth.service";
import {useEffect} from "react";
import {Spinner} from "react-bootstrap";
import styles from "../../../EmployeeViewPage/ProfileViewComponent/ProfileViewComponent.module.css";

function RemoveField(props){

    const [fieldNames,setFieldNames] = useState([]);
    const [deletedFields,setDeletedFields] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const findDataTypes = async () => {
            await Axios.get("http://localhost:3001/api/hrManager/getDataTypes",{
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(
                (res) => {
                    setFieldNames(res.data.result.slice(18));
                }
            );
        };
        findDataTypes();


        setIsLoading(false);
    }, []);



    function handleSubmit(event){
        event.preventDefault();
        if(deletedFields.length === 0){
            props.setHidden(true);
        }
        const formColumns = []
        for(let i = 0; i < deletedFields.length; i++){
            formColumns.push(deletedFields[i].COLUMN_NAME);
        }
        const formData = {fields: formColumns};
        Axios.post(
            "http://localhost:3001/api/hrManager/deleteColumns",
            formData,{
                headers: { "x-auth-token": authService.getUserToken() },
            }).then(async (res) => {
            if(!res.data.success) {
                alert("Error occured!");
            }else{
                window.location.reload(false)
            }
        });

    }

    function handleCancel(event){
        event.preventDefault();
        props.setHidden(true);

    }

    function showAddedRow(field){
        return(
            <div className="row">
                <div className="col-5">
                    <span>{field.COLUMN_NAME}</span>
                </div>
                <div className="col-5">
                    <span>{field.DATA_TYPE}</span>
                </div>
                <div className="col-2">
                    <button type="button"  onClick = {handleRemove} id={field.COLUMN_NAME} name={field.COLUMN_NAME} className="btn btn-primary">Remove</button>
                </div>
            </div>
        )
    }

    function showDeletedRow(field){
        return(
            <div className="row">
                <div className="col-5">
                    <span>{field.COLUMN_NAME}</span>
                </div>
                <div className="col-5">
                    <span>{field.DATA_TYPE}</span>
                </div>
                <div className="col-2">
                    <button type="button"  onClick={handleAdd} id={field.COLUMN_NAME} name={field.COLUMN_NAME} className="btn btn-primary">Add</button>
                </div>
            </div>
        )
    }

    function showAddedFields(){

        return(
            <div>
                <h4>Inserted Fields</h4>
                <div className="row">
                    <div className="col-5">
                        <span className={Styles["table_header"]}>Name</span>
                    </div>
                    <div className="col-5">
                        <span className={Styles["table_header"]}>Data Type</span>
                    </div>
                    <div className="col-2">
                        <span className={Styles["table_header"]}></span>
                    </div>
                </div>
                <hr />
                {fieldNames.map(showAddedRow)}
            </div>
            )
    }


    function showRemovedFields(){

        return(
            <div>
                <h4>Removed Fields</h4>
                <div className="row">
                    <div className="col-5">
                        <span className={Styles["table_header"]}>Name</span>
                    </div>
                    <div className="col-5">
                        <span className={Styles["table_header"]}>Data Type</span>
                    </div>
                    <div className="col-2">
                        <span className={Styles["table_header"]}></span>
                    </div>
                </div>
                <hr />
                {deletedFields.map(showDeletedRow)}
            </div>
        )
    }

    function handleRemove(event){
        event.preventDefault();
        const field = fieldNames.filter((field)=>field.COLUMN_NAME === event.target.name)[0];
        setFieldNames(fieldNames.filter((field)=>field.COLUMN_NAME !== event.target.name))
        const removeList = JSON.parse(JSON.stringify(deletedFields));
        removeList.push(field);
        setDeletedFields(removeList);
    }

    function handleAdd(event){
        event.preventDefault();
        const field = deletedFields.filter((field)=>field.COLUMN_NAME === event.target.name)[0];
        setDeletedFields(deletedFields.filter((field)=>field.COLUMN_NAME !== event.target.name))
        const addList = JSON.parse(JSON.stringify(fieldNames));
        addList.push(field);
        setFieldNames(addList);
    }

    return(
        <div>
            {isLoading ? (
                <Spinner animation="border" role="status" className={styles['spinner']}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
                <div className={Styles["modal"]} hidden={props.hidden}>
                    <div className={Styles["modal-content"]}>
                        <div className="col-12">
                            <Form onSubmit={handleSubmit}>
                                {showAddedFields()}
                                <br/>
                                {showRemovedFields()}
                                <br />
                                <div className="row gutters">
                                    <div className="col-12 col-md-2">
                                        <button type="button" onClick={handleCancel} id="cancel" name="cancel" className="btn btn-primary">Cancel</button>
                                    </div>
                                    <div className="col-12 col-md-2">
                                        <button type="submit" id="submit" name="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                )}
        </div>

    );




}

export default RemoveField;