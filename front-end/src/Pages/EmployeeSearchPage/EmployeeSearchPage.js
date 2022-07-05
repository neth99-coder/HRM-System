import React, { Component } from "react";
import Search from "./SearchComponent/SearchComponent";
import Result from "./ResultComponent/ResultComponent";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import authService from "../../services/auth.service";

function EmployeeSearch(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [getEmpId, setEmpId] = useState("");
  const [getDepartment, setDepartment] = useState("");
  const [getDepartments, setDepartments] = useState([]);
  const [getEmployees, setEmployees] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const findDepartments = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getDepartments", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setDepartments(res.data.result);
      });
    };
    findDepartments();

    const findEmployees = async () => {
      await Axios.get("http://localhost:3001/api/hrManager/getemployees", {
        headers: { "x-auth-token": authService.getUserToken() },
      }).then((res) => {
        setEmployees(res.data.result);
      });
    };
    findEmployees();
  }, []);

  const SearchChange = (target) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name == "employeeid") {
      setEmpId(value);
    } else {
      setDepartment(value);
    }
  };

  return (
    <div className="mt-1">
      <Search
        departments={getDepartments}
        department={getDepartment}
        employeeid={getEmpId}
        searchChange={SearchChange}
      />
      <Result
        employees={getEmployees}
        employeeid={getEmpId}
        departments={getDepartments}
        department={getDepartment}
      />
    </div>
  );
}

export default EmployeeSearch;
