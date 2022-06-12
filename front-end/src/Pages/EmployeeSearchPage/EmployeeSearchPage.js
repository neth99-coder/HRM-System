import React,{Component} from "react";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/Header/NavBarComponent/NavBarComponent";
import Search from "./SearchComponent/SearchComponent";
import Result from "./ResultComponent/ResultComponent";

class EmployeeSearch extends Component{

    constructor(props) {
        super(props);

        this.state = {
            employeeid: '',
            department: ''
        }
        this.SearchChange = this.SearchChange.bind(this);
    }

    SearchChange(target){
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    render() {

        return(
            <div className="mt-1">
                <Search departments={this.props.departments} department={this.state.department} employeeid={this.state.employeeid} searchChange={this.SearchChange}/>
                <Result employees={this.props.employees} employeeid={this.state.employeeid} departments={this.props.departments} department={this.state.department}/>
            </div>
        )
    }
}

export default EmployeeSearch;
