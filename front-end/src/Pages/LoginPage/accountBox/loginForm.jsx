import React, {useContext, useState} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {Form} from "reactstrap";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import styles from "./index.module.css";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [empId,setEmpId] = useState();
  const [password,setPassword] = useState();
  const [isError,setIsError] = useState(false);
  const [error,setError] = useState();


  function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;

      if(name === "empId"){
        setEmpId(value);
      }else if(name === "password"){
        setPassword(value);
      }

      console.log(empId,password);
  }

  function handleSubmit(event){
    event.preventDefault();
    if(empId === "" || password === "" || empId === undefined || password === undefined){
      setIsError(true);
      setError("Employee ID and Password Required!");

    }else{
      console.log(empId,password);
    }
  }

  return (
    <BoxContainer>
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <Input name="empId" id = "empId" onChange={handleChange} required type="text" placeholder="Employee ID" />
            <Input name="password" id = "password" onChange={handleChange} required type="password" placeholder="Password" />

          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <div className={styles["error-msg"]} hidden={!isError}>
            <p>{error}</p>
          </div>
          <MutedLink href="#">Forget your password?</MutedLink>
          <Marginer direction="vertical" margin="1.6em" />

          <SubmitButton id="submit" name="submit" type="submit">Signin</SubmitButton>

          <Marginer direction="vertical" margin="1em" />
          <MutedLink href="#">
            Don't have an account?{" "}
            <BoldLink href="#" onClick={switchToSignup}>
              Signup
            </BoldLink>
          </MutedLink>
        </Form>
    </BoxContainer>
  );
}