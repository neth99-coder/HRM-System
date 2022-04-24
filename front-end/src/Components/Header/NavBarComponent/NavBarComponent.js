import React,{Component} from "react";
import {Navbar,Nav,NavbarToggler,Collapse,NavItem,NavLink,NavbarBrand} from "reactstrap";
import style from "./NavBar.Module.css";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <Navbar className={style['navbarStyle']} variant='light' expand="md">
                <div className="container">
                    <NavbarToggler className="fa fa-arrow-down" onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-check fa-lg"></span> Attendance
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-users fa-lg"></span> Employee
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-book fa-lg"></span> Report
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-adjust fa-lg"></span> Leave Config.
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }

}

export default NavBar;