import React,{Component} from "react";
import Header from "../Header/Header";
import NavBar from "../Header/NavBarComponent/NavBarComponent";
import {Breadcrumb, BreadcrumbItem,Form,FormGroup,Label,Col,Input,FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";
import FindEmployeeByID from "../../shared/findEmployeeByID";
import Styles from "./EditProfie.module.css";

class EditProfile extends Component{

    constructor(props) {
        super(props);

        this.state = {
            employee: FindEmployeeByID("AD-0002")
        }

    }

    render() {
        return(
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/employee'>Employee</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to={`/employee/${this.state.employee.emp_id}`}>{this.state.employee.first_name + " " + this.state.employee.last_name}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Edit
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="text-primary">Edit Profile</h1>
                    <hr/>

                    <div className="row">
                        {/* Left Column*/}
                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={this.state.employee.profile_picture} alt={this.state.employee.first_name + " " + this.state.employee.last_name} className={Styles["profile-dp"]}/>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="alert alert-info alert-dismissable">
                                <a className="panel-close close" data-dismiss="alert">x</a>
                                <i className="fa fa-coffee"></i>
                                This is an <strong>.alert</strong>. Use this to show important messages to the user.
                            </div>


                            <h3>Personal info</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;