import React, {useContext, useState} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import styles from "./index.module.css";
import Axios from "axios";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [empId,setEmpId] = useState();
  const [password,setPassword] = useState();
  const [confPassword,setConfPassword] = useState();
  const [isError,setIsError] = useState(false);
  const [error,setError] = useState();

  function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;

      if(name === "empId"){
          setEmpId(value);
      }else if(name === "password"){
          setPassword(value);
      }else if(name === "confPassword"){
          setConfPassword(value);
      }
  }

  function validate(){
      if(empId === undefined || password === undefined || confPassword === undefined ||
      empId === "" || password === "" || confPassword === ""){
          setIsError(true);
          setError("Employee ID, Password and Confirm Password Required!");
          return false;
      }else if(password !== confPassword){
          setIsError(true);
          setError("Password and Confirm Password are not matching!");
          return false;
      }
      return true;
  }

  function handleSubmit(event){
      event.preventDefault();
      if(validate()){
          const formValues = {
              emp_id: empId,
              password: password
          };

          Axios.post(
              "http://localhost:3001/api/auth/signupUser",
              formValues
          ).then((res) =>{
              if(res.data.result === "employee not found"){
                  setIsError(true);
                  setError("Employee not Found!");
              }else if(res.data.result === "already exist"){
                  setIsError(true);
                  setError("User account already exist!");
              }else{
                  window.location.reload(false);
              }
          })

      }
  }

  return (
    <BoxContainer>
        <form onSubmit={handleSubmit}>
            <FormContainer>
                <Input name="empId" id="empId" type="text" onChange={handleChange} placeholder="Employee ID" />
                <Input name="password" id = "password" type="password" onChange={handleChange} placeholder="Password" />
                <Input name="confPassword" id = "confPassword" type="password"  onChange={handleChange} placeholder="Confirm Password" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <div className={styles["error-msg"]} hidden={!isError}>
                <p>{error}</p>
            </div>
            <SubmitButton name="submit" id="submit" type="submit">Signup</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>
                    Signin
                </BoldLink>
            </MutedLink>
        </form>
    </BoxContainer>
  );
}