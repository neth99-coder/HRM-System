import {React, useState} from "react";
import {Form, FormGroup} from "reactstrap";
import Styles from "./AddNewFieldComponent.module.css";
import Axios from "axios";

function AddNewField(props){

    const [fieldName,setFieldName] = useState();
    const [dataType,setDataType] = useState();
    const [maxSize,setMaxSize] = useState();


    function handleSubmit(event){
        event.preventDefault();
        const newFieldData = {
            fieldName: fieldName,
            dataType: dataType,
            maxSize: maxSize
        }
        Axios.post(
            "http://localhost:3001/api/hrManager/addColumn",
            newFieldData).then(async (res) => {
                if(!res.data.success) {
                    alert("Error occured!");
                }else{
                    setFieldName("");
                    setMaxSize("");
                    setDataType("");
                    props.setHidden(true);
                }
            });
    }

    function handleCancel(event){
        event.preventDefault();
        props.setHidden(true);
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        if(name === "fieldName"){
            setFieldName(value);
        }else if(name === "dataType"){
            setDataType(value);
        }else if(name === "maxSize"){
            setMaxSize(value);
        }

    }

    return(
            <div className={Styles["modal"]} hidden={props.hidden}>
                <div className={Styles["modal-content"]}>
                    <Form>

                        <div>
                            <FormGroup>
                                <label htmlFor="fieldName">Field Name</label>
                                <input type="text"
                                       className={Styles["form-control"]}
                                       id="fieldName"
                                       name="fieldName"
                                       required={true}
                                       placeholder="Enter field name"
                                       value={fieldName}
                                       onChange={handleChange}/>
                            </FormGroup>
                        </div>

                        <div>
                            <FormGroup>
                                <label htmlFor="dataType">Data Type</label>
                                <select
                                    className={Styles["form-control"]}
                                    id="dataType"
                                    name="dataType"
                                    placeholder="Select Data Type"
                                    required={true}
                                    value={dataType}
                                    onChange={handleChange}>
                                    <option value={""} hidden={true}>Select Data Type</option>
                                    <option value={"int"} >Integer Number</option>
                                    <option value={"float"} >Float Number</option>
                                    <option value={"varchar"} >Characters</option>
                                </select>
                            </FormGroup>
                        </div>

                        <div hidden={dataType !== "varchar"}>
                            <FormGroup>
                                <label htmlFor="maxSize">Max Size</label>
                                <input type="number"
                                       className={Styles["form-control"]}
                                       id="maxSize"
                                       name="maxSize"
                                       value={maxSize}
                                       required={true}
                                       placeholder="Enter length of the field"
                                       onChange={handleChange}/>
                            </FormGroup>
                        </div>
                    </Form>

                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right row">
                                <div className="col-2 col-xl-1">
                                    <Form onSubmit={handleCancel}>
                                        <button type="submit" id="cancel" name="cancel"
                                                className="btn btn-primary">Cancel
                                        </button>
                                    </Form>
                                </div>
                                <div className="col-2 col-xl-1">
                                    <Form onSubmit={handleSubmit}>
                                        <button type="submit" id="submit" name="submit"
                                                className="btn btn-primary">Add
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );


}

export default AddNewField;