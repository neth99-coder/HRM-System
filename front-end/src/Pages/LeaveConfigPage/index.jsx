import React, {useState} from "react";
import Header from "../../Components/Header/Header";

import { Button, Dropdown, Container, Nav, Form } from "react-bootstrap";

import styled from "./index.module.css";

function LeaveConfigForm() {

  const [paygrade, setPaygrade] = useState("Select Paygrade");

  return (
    <>
      <Form className={`${styled["main-form"]} ${styled["admin-form"]}`}>
        <h3 className={styled["form-title"]}>Leave Configeration</h3>

        <Dropdown className={styled["paygrade-select-container"]}>
          <Dropdown.Toggle className={styled["paygrade-select"]} variant="primary" id="dropdown-basic">
            <span className={styled["paygrade-text"]}>{paygrade}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{setPaygrade("Paygrade 1")}}>Paygrade 1</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPaygrade("Paygrade 2")}}>Paygrade 2</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPaygrade("Paygrade 3")}}>Paygrade 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Casual Leaves</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of casual leaves"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Medical Leaves</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of casual leaves"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Annual Leaves</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of casual leaves"
          />
        </Form.Group>

        {/* Validation part before changing the Leaves */}
        <div className={styled["form-validation-container"]}>
          <Form.Group
            className={`mb-3 ${styled["form-validation"]}`}
            controlId="formBasicPassword"
          >
            <Form.Label className={styled["validation-label"]}>
              User Email
            </Form.Label>
            <Form.Control type="email" placeholder="Enter user email" />
          </Form.Group>
          <Form.Group
            className={`mb-3 ${styled["form-validation"]}`}
            controlId="formBasicPassword"
          >
            <Form.Label className={styled["validation-label"]}>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </>
  );
}

function LeaveConfigPage() {
  // Need to import these details from the server
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  // Current User leave data
  // const profileDetails = {
  //   dp: "profile-pic.JPG",
  //   name: "Nethmi Jayakody",
  //   post: "Admin",
  // };

  return (
    <>
      {/* <Header
        className={styled["main-header"]}
        profileDetails={profileDetails}
        companyDetails={companyDetails}
      /> */}

      <main className={styled['main']}>
        <LeaveConfigForm />
      </main>
    </>
  );
}

export default LeaveConfigPage;
