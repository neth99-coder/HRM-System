import React,{Component} from "react";
import {Navbar,Nav,NavbarToggler,Collapse,NavItem,NavLink} from "reactstrap";
import style from "./NavBar.Module.css";
import getEmployeeLevel from "../../../shared/getEmployeeLevel";
import {Outlet} from "react-router-dom";


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            employeeLevel: this.props.type
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen

        });
    };

    attendanceNav(){
        if(this.state.employeeLevel === 3){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/hrmanager/">
                        <span className="fa fa-2x fa-check fa-lg"></span> Attendance
                    </NavLink>
                </NavItem>
            );
        }
    }

    employeeNav(){
        if(this.state.employeeLevel === 3){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/hrmanager/employee">
                        <span className="fa fa-2x fa-users fa-lg"></span> Employee
                    </NavLink>
                </NavItem>
            );
        }
    }

    reportNav(){
        if(this.state.employeeLevel === 3){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/hrmanager/">
                        <span className="fa fa-2x fa-book fa-lg"></span> Report
                    </NavLink>
                </NavItem>
            );
        }
    }

    leaveConfNav(){
        if(this.state.employeeLevel === 3){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/hrmanager">
                        <span className="fa fa-2x fa-adjust fa-lg"></span> Leave Config.
                    </NavLink>
                </NavItem>
            );
        }
    }

    applyLeaveNav(){
        if(this.state.employeeLevel === 1){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/employee/requests">
                        <span className="fa fa-2x fa-envelope fa-lg"></span> Apply Leave
                    </NavLink>
                </NavItem>
            );
        }else if(this.state.employeeLevel === 2){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/supervisor/requests">
                        <span className="fa fa-2x fa-envelope fa-lg"></span> Apply Leave
                    </NavLink>
                </NavItem>
            );
        }else if(this.state.employeeLevel === 3){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/hrmanager/requests">
                        <span className="fa fa-2x fa-envelope fa-lg"></span> Apply Leave
                    </NavLink>
                </NavItem>
            );
        }
    }

    leaveRequestsNav(){
        if(this.state.employeeLevel === 2){
            return(
                <NavItem>
                    <NavLink className="nav-link" href="/supervisor">
                        <span className={"fa fa-2x fa-envelope-open fa-lg "}></span> Leave Requests
                    </NavLink>
                </NavItem>
            );
        }
    }

    render() {
        return(
            <div>
                <Navbar className={style['navbarStyle']} bg="primary" variant='light' expand="md">
                    <div >
                        <NavbarToggler className="fa fa-2x fa-arrow-down" onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className={style["navbar"]}>
                                <NavItem>
                                    <NavLink className={style["nav-link"]} href="/">
                                        <span className="fa fa-2x fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>

                                {this.attendanceNav()}
                                {this.applyLeaveNav()}
                                {this.employeeNav()}
                                {this.leaveRequestsNav()}
                                {this.reportNav()}
                                {this.leaveConfNav()}

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>


                <Outlet></Outlet>
            </div>

        );
    }

}

export default NavBar;