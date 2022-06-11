import React, { Component } from 'react';
import styles from "./adminFront.module.css";
import Profile from "../Components/Profile/profile.js";

function adminFront() {
    return ( 
        <div className={`${styles["admin-container"]}`}>
            <div className={`${styles["admin-heading"]}`}>
                <h1>Staff</h1>
            </div>
            <div className={`${styles["hrmanager-container"]}`}>
                <div className={`${styles["hrmanager-heading"]}`}>
                    <h1>HR Manager</h1>
                </div>
                <button className={`${styles["hrmanager-profile"]}`} data-toggle="modal" data-target="#addHRManager">
                    <h1>+</h1>
                </button>
            </div> 
            <div className={`${styles["employee-container"]}`}>
                <div className={`${styles["employee-heading"]}`}>
                    <h1>Employees</h1>
                </div>
                {/* <div className={`${styles["employee-profiles"]}`}>
                    <div className={`${styles["employee-img-container"]}`}>
                        <i className={`${styles["employee-img"]} bx bx-user`}></i>
                    </div>
                    <div className = {`${styles["employee-message"]}`}>
                        <p>No employees are added yet.</p>
                    </div>
                </div> */}
                <div className={`${styles["profiles"]}`}>
                    <div className={`${styles["profile"]}`}>
                        <Profile />
                    </div>
                    <div className={`${styles["profile"]}`}>
                        <Profile />
                    </div>
                    <div className={`${styles["profile"]}`}>
                        <Profile />
                    </div>
                </div>
            </div> 

            {/* modal for adding the HRM */}
            <div className="modal fade" id="addHRManager" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor:"black"}}>
                        <h5 className="modal-title" id="exampleModalLongTitle" style={{color:"white",fontWeight:"bold"}}>Add HR Manager</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className={`${styles["field-container"]} row`}>
                                <div className = {`${styles["profile-img"]} col-lg-4`}>
                                    <p style={{fontWeight:"bold"}}>Profile Image</p>
                                    <hr/>
                                    {/* <input type="file" className={`${styles["img-container"]}`}/> */}
                                    <button className={`${styles["img-container"]}`}> + </button>
                                </div>
                                <div className = {`${styles["basic-info"]} col-lg-6`}>
                                    <p style={{fontWeight:"bold"}}>Basic Information</p>
                                    <hr/>
                                    <div className = {`${styles["form-field"]}`}>
                                        <input id="name" type="text" className={`${styles["input-text"]}`}/>
                                        <label for="name" className={`${styles["label"]}`}>Name </label>
                                    </div>
                                    <div className = {`${styles["form-field"]}`}>
                                        <input id="address" type="text" className={`${styles["input-text"]}`}/>
                                        <label for="address" className={`${styles["label"]}`}>Address</label>
                                    </div>
                                    <div className = {`${styles["form-field"]}`}>
                                        <input id="nic" type="text" className={`${styles["input-text"]}`}/>
                                        <label for="nic" className={`${styles["label"]}`}>NIC</label>
                                    </div>
                                    <div className = {`${styles["form-field"]}`}>
                                        <input id="bday" type="text" className={`${styles["input-text"]}`}/>
                                        <label for="bday" className={`${styles["label"]}`}>BirthDay</label>
                                    </div>
                                    <div className = {`${styles["form-field"]}`}>
                                        <input id="maritial" type="text" className={`${styles["input-text"]}`}/>
                                        <label for="maritial" className={`${styles["label"]}`}>Maritial Status</label>
                                    </div>
                                </div>
                            </div>
                            <div className = {`${styles["employee-info"]} col-12`}>
                                <p style={{fontWeight:"bold"}}>Employee Information</p>
                                <hr/>
                                <div className = {`${styles["form-field"]}`}>
                                    <input id="empid" type="text" className={`${styles["input-text"]}`}/>
                                    <label for="empid" className={`${styles["label"]}`}>Employee ID</label>
                                </div>
                                <div className = {`${styles["form-field"]}`}>
                                    <input id="recdate" type="text" className={`${styles["input-text"]}`}/>
                                    <label for="recdate" className={`${styles["label"]}`}>Recruited Date</label>
                                </div>
                                <div className = {`${styles["form-field"]}`}>
                                    <input id="paygrade" type="text" className={`${styles["input-text"]}`}/>
                                    <label for="paygrade" className={`${styles["label"]}`}>Paygrade</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{backgroundColor:"black"}}>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{fontWeight:"bold"}}>Close</button>
                        <button type="button" className="btn btn-light" style={{fontWeight:"bolder"}}>ADD</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default adminFront;