import React, { Component } from 'react';
import styles from "./adminFront.module.css";

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
                <div className={`${styles["employee-profiles"]}`}>
                    <div className={`${styles["employee-img-container"]}`}>
                        <i className={`${styles["employee-img"]} bx bx-user`}></i>
                    </div>
                    <div className = {`${styles["employee-message"]}`}>
                        <p>No employees are added yet.</p>
                    </div>
                </div>
            </div> 

            {/* modal for adding the HRM */}
            <div className="modal fade" id="addHRManager" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add HR Manager</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default adminFront;