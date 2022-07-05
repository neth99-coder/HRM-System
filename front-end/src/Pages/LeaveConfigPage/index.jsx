import { Button, Navbar, Container, Nav, Form } from "react-bootstrap";
import React from "react";
import Header from "../../Components/Header/Header";

import styled from "./index.module.css";

function AdminLeaveConfig() {
  return (
    <>
      <Form className={`${styled["main-form"]} ${styled["admin-form"]}`}>
        <h3 className={styled["form-title"]}>Admin Leave Configeration</h3>
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
  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };

  return (
    <>
      <Header
        className={styled["main-header"]}
        profileDetails={profileDetails}
        companyDetails={companyDetails}
      />

      <main>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Leave Configeration</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/leave-config/admin-leave-config">Admin</Nav.Link>
              <Nav.Link href="#hr-leave-config">HR Manager</Nav.Link>
              <Nav.Link href="#sup-leave-config">Supervisor</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <AdminLeaveConfig />
      </main>
    </>
  );
}

export default LeaveConfigPage;
