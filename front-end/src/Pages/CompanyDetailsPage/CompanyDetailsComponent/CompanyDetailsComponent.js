import {React, useState} from "react";
import {Form, FormGroup} from "reactstrap";
import Styles from "./CompanyDetailsComponent.module.css";
import {Link} from "react-router-dom";

function CompanyDetailsComponent(props){

    const [name,setName] = useState();
    const [address,setAddress] = useState();

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        if(name === "name"){
            setName(value);
        }else if(name === "address"){
            setAddress(value);
        }
    }

    return(
        <div>
            <div className="container col-12 col-sm-6 col-md-4 col-lg-3">
                <h1>Company Details</h1>

                <Form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <FormGroup>
                            <label htmlFor="name">Company Name</label>
                            <input type="text"
                                   className={Styles["form-control"]}
                                   id="name"
                                   name="name"
                                   required={true}
                                   value={name}
                                   placeholder={"Enter Company Name"}
                                   onChange={handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-12">
                        <FormGroup>
                            <label htmlFor="address">Company Address</label>
                            <input type="text"
                                   className={Styles["form-control"]}
                                   id="address"
                                   name="address"
                                   required={true}
                                   value={address}
                                   placeholder={"Enter Company Address"}
                                   onChange={handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="row gutters">
                        <div className="col-12">
                            <div className="text-right">
                                <Link to={"/admin"}>
                                    <button type="button" id="cancel" name="cancel" className="btn btn-secondary">
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