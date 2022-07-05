import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Form } from "reactstrap";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import styles from "./index.module.css";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [empId, setEmpId] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "empId") {
      setEmpId(value);
    } else if (name === "password") {
      setPassword(value);
    }

    console.log(empId, password);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      empId === "" ||
      password === "" ||
      empId === undefined ||
      password === undefined
    ) {
      setIsError(true);
      setError("Employee ID and Password Required!");
    } else {
      console.log(empId, password);
      Axios.post("http://localhost:3001/api/auth/loginUser", {
        empId: empId,
        password: password,
      }).then((res) => {
        if (!res.data.success) {
          setIsError(true);
          setError("Error Occuered!");
        } else {
          console.log(res.data.result);
          localStorage.setItem("user", res.data.result);
          let decoded = jwt_decode(res.data.result);
          //console.log("Login Successful");
          switch (decoded.type) {
            case 1:
              // navigate("/player");
              // window.location.reload(false);
              window.location.href = "/employee";

              break;
            case 2:
              // navigate("/organizer");
              // window.location.reload(false);
              window.location.href = "/supervisor";

              break;
            case 3:
              // navigate("/admin");
              // window.location.reload(false);
              window.location.href = "/hrmanager";

              break;

            case 4:
              // navigate("/admin");
              // window.location.reload(false);
              window.location.href = "/admin";

              break;
            default:
              break;
          }
        }
      });
    }
  }

  return (
    <BoxContainer>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <Input
            name="empId"
            id="empId"
            onChange={handleChange}
            required
            type="text"
            placeholder="Employee ID"
          />
          <Input
            name="password"
            id="password"
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <div className={styles["error-msg"]} hidden={!isError}>
          <p>{error}</p>
        </div>
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />

        <SubmitButton id="submit" name="submit" type="submit">
          Signin
        </SubmitButton>

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
