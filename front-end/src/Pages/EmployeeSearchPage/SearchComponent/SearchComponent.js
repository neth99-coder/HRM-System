import React,{Component} from "react";
import {Button,Form,FormGroup,Label,Input,Col,FormFeedback} from "reactstrap";
import Option from "../../../Components/UI/Dropdown/Option";
import {Link} from "react-router-dom";

class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            touched: {
                employeeid: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        this.props.searchChange(target);
    }

    handleSubmit(event){
        event.preventDefault();

    }

    render() {

            const departmentList = this.props.departments.map((department) =>{
                return(
                    <option key={department.dept_id} value={department.dept_id}>{department.name}</option>
                );
            });

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Search Employee</h3>
                    </div>

                    <div className="col-12">
                        <Form  onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <FormGroup row>
                                        <Label htmlFor="employeeid" lg={4}>Employee ID:</Label>
                                        <Col lg={6}>
                                            <Input type="text" id="employeeid" name="employeeid"
                                                   placeholder="Employee ID"
                                                   value={this.props.employeeid}
                                                   onChange={this.handleInputChange}
                                                   />
                                        </Col>
                                    </FormGroup>
                                </div>

                                <div className="col-5">
                                    <FormGroup row>
                                        <Label htmlFor="department" lg={4}>Department:</Label>
                                        <Col lg={6}>
                                            <Input type="select" id="department" name="department"
                                                   value={this.props.department}
                                                   onChange={this.handleInputChange}
                                                    placeholder={"Department"}>
                                                    <option value={""} hidden={true}>Department</option>
                                                   {departmentList}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </div>
                        </Form>
                    </div>

                    <div>
                        <Link to={"/hrmanager/employee/add-new"} >
                            <button type="button" id="addNew" name="addNew"
                                    className="btn btn-primary">Add New Employee
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );

    }
}

export default Search;
