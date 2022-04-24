import React,{Component} from "react";
import {DEPARTMENT} from "../../shared/department";
import {Routes,Route,} from "react-router-dom";
import Header from "../Header/Header";
import NavBar from "../Header/NavBarComponent/NavBarComponent";
import Search from "../EmployeeSearchComponent/SearchComponent/SearchComponent";


class Main extends Component{
    constructor(props) {
        super(props);

        this.state = {
            department: DEPARTMENT
        }
    }



    render() {

        const companyDetails = {
            logo: "logo.png",
            name: "Jupiter Apperels",
            addressLine1: "paravi Island",
            addressLine2: "Matara",
        };

        const profileDetails = {
            dp: "profile-pic.JPG",
            name: "Poorna Jayakodi",
            post: "Admin",
        };

        const HomePage = () => {
            return(
                <Header companyDetails={companyDetails} profileDetails={profileDetails}/>
            );
        }

        const EmployeePage = () => {
            return(
                <Search departments={this.state.department}/>
            );
        }

        return(
            <div>
                <Routes>
                    <Route path="/" component={HomePage} />
                    <Route path="/employee" component={EmployeePage}/>
                </Routes>
            </div>
        );

    }

}
export default Main;