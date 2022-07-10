import {React, useEffect, useState} from "react";
import {Form, FormGroup} from "reactstrap";
import styles from "./CompanyDetailsComponent.module.css";
import {Link} from "react-router-dom";

function CompanyDetailsComponent(props){

    const [name,setName] = useState(props.companyDetails.name)
    const [address,setAddress] = useState(props.companyDetails.addressLine1)

    useEffect(()=>{
        console.log(props)
    },[])

    function handleSubmit(event){
        event.preventDefault();
        
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        if(name === "name"){
            setName(value)
        }else if(name === "address"){
            setAddress(value)
        }
    }

    return(
        <div className={styles['main']}>
            <div    >
                <h1>Company Details</h1>

                <Form onSubmit={handleSubmit}>
                    <div className={`${styles['form-field']}`}>
                        <FormGroup>
                            <label className={`${styles['label']}`} htmlFor="name">Company Name</label>
                            <input type="text"
                                   className={`${styles['input-text']}`}
                                   id="name"
                                   name="name"
                                   required={true}
                                   value={name}
                                   onChange={handleChange}/>
                        </FormGroup>
                    </div>

                    <div className={`${styles['form-field']}`} style={{display:'flex'}}>
                        <FormGroup>
                            <label className={`${styles['label']}`} htmlFor="address">Company Address</label>
                            <input type="text"
                                   className={`${styles['input-text']}`}
                                   id="address"
                                   name="address"
                                   required={true}
                                   value="615"
                                   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup> 
                        <input type="text"
                                   className={`${styles['input-text']}4`}
                                   id="address"
                                   name="address"
                                   required={true}
                                   value={address}
                                   onChange={handleChange}/>
                        </FormGroup>
                    </div>

                    <div className=" row gutters">
                        <div className="col-12">
                            <div className="text-right">
                                <Link to={"/admin"}>
                                    <button type="button" id="cancel" name="cancel" style={{marginRight:'10px'}} className="btn btn-secondary">
                                        Cancel
                                    </button>
                                </Link>
                                    <button type="submit" id="submit" name="submit" className="btn btn-primary">
                                        Save
                                    </button>
                            </div>
                        </div>
                    </div>

                </Form>
            </div>

        </div>
    )
}


export default CompanyDetailsComponent;