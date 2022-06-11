import { React, useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Form, Modal } from "react-bootstrap";

import styles from "./RequestPage.module.css";
import RequestCard from "./RequestCard";

const RequestPage = () => {
  const [types, setTypes] = useState(["All"]); //reason types          ----> this should not be reasons as now
  const [requests, setRequests] = useState([]); //requests array
  const [newRequest, setNewRequest] = useState({
    emp_id: "190253K",
    superviser_name: "Poorna Cooray",
    type: "",
    reason: "",
    leave_begin: "",
    leave_end: "",
  });
  const [validated, setValidated] = useState(false);   //form validation

  const [show, setShow] = useState(false);    //maodal show
  const handleClose = () => setShow(false);  //handle modal close
  const handleShow = () => setShow(true);    //handle modal show

  var arr1 = [
    {
      state_id: 0,
      leave_begin: "06-04-2022",
      type: "Full Day",
      reason: "Sick",
    },
    {
      state_id: 0,
      leave_begin: "06-04-2022",
      type: "Full Day",
      reason: "Sick",
    },
    {
      state_id: 1,
      leave_begin: "06-04-2022",
      type: "Full Day",
      reason: "Casual",
    },
    {
      state_id: 0,
      leave_begin: "06-04-2022",
      type: "Hlaf Day",
      reason: "Sick",
    },
    {
      state_id: -1,
      leave_begin: "06-04-2022",
      type: "Full Day",
      reason: "Sick",
    },
    {
      state_id: 0,
      leave_begin: "06-04-2022",
      type: "Half Day",
      reason: "Casual",
    },
    {
      state_id: 0,
      leave_begin: "06-04-2022",
      type: "Full Day",
      reason: "Sick",
    },
  ];

  const arr2 = ["Sick", "Casual"];
  arr2.unshift("All"); //adding all to reasons

  useEffect(() => {
    setTypes(arr2);

    setRequests(arr1);

    document.getElementById("All-li").classList.add("active"); //default select

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function to show only selecyed type of leaves
  function handleSort(e) {
    const id = e.target.id;
    const sortEls = document.getElementsByTagName("li");

    //select type
    for (var i = 0; i < sortEls.length; i++) {
      if (sortEls[i].id === id + "-li") {
        document.getElementById(sortEls[i].id).classList.add("active");
      } else {
        document.getElementById(sortEls[i].id).classList.remove("active");
      }
    }
    //filter out only the reasons for selected type
    if (id !== "All") {
      setRequests(
        arr1.filter((request) => {
          return id === request.reason;
        })
      );
    } else {
      setRequests(arr1);
    }
  }

  //function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (
      newRequest.type !== "" &&
      newRequest.reason !== "" &&
      newRequest.leave_begin !== "" &&
      newRequest.leave_end !== ""
    ) {
      window.location.reload(false);   //refresh page
    }
  }

  //function to handle inputs
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "reason") {
      setNewRequest((prevVal) => {
        return { ...prevVal, reason: value };
      });
    } else if (name === "d-start") {
      setNewRequest((prevVal) => {
        return { ...prevVal, leave_begin: value };
      });
    } else if (name === "d-end") {
      setNewRequest((prevVal) => {
        return { ...prevVal, leave_end: value };
      });
    }
  }

  //function to handle select options
  function handleSelect(e) {
    const type = e.target.value;
    setNewRequest((prevVal) => {
      return { ...prevVal, type: type };
    });
  }

  return (
    <div>
      <div className="row">
        <div className={`${styles["topic"]} col align-self-start h1`}>
          LEAVES
        </div>
        <div className="col align-self-center">
          <nav
            aria-label="Page navigation example"
            className={styles["page-nav"]}
          >
            <ul className={`pagination justify-content-center`}>
              {types.map((cur, index) => {
                return (
                  <li
                    className={`${styles["sort-el"]} page-item`}
                    onClick={handleSort}
                    id={cur + "-li"}
                  >
                    <p className="page-link" id={cur}>
                      {cur}
                    </p>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="col">
          <button
            className={`${styles["new-leave-btn"]}`}
            type="button"
            onClick={handleShow}
          >
            <BsPlusLg />
          </button>
        </div>
      </div>

      <div className={`${styles["list-box"]} row`}>
        {requests?.map((cur, index) => {
          return (
            <div className="col-lg-4 col-md-6 col-ms-12" key={index}>
              <RequestCard
                key={index}
                state_id={cur.state_id}
                leave_begin={cur.leave_begin}
                type={cur.type}
                reason={cur.reason}
              />
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> APPLY LEAVE </Modal.Title>{" "}
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group row">
              <label for="emp-id" className="col-sm-3 col-form-label m-t-5">
                Employee ID
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  className={`${styles["mb-1"]} form-control`}
                  name="emp-id"
                  required
                  value={newRequest.emp_id}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="sup-name" className="col-sm-3 col-form-label">
                Supervisor Name
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  className={`${styles["mb-1"]} form-control`}
                  name="sup-name"
                  required
                  value={newRequest.superviser_name}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="r-type" className="col-sm-3 col-form-label">
                Request Type
              </label>
              <div className="col-sm-8">
                <Form.Select
                  onChange={handleSelect}
                  value={newRequest.type}
                  className={`${styles["mb-1"]} form-select`}
                  required
                >
                  <option selected disabled hidden value="">
                    Select
                  </option>
                  {types.map((cur) => {
                    return <option> {cur} </option>;
                  })}
                </Form.Select>
              </div>
            </div>

            <div className="form-group row">
              <label for="reason" className="col-sm-3 col-form-label">
                Reason
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  className={`${styles["mb-1"]} form-control`}
                  name="reason"
                  placeholder="Reason"
                  required
                  value={newRequest.reason}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="d-start" className="col-sm-3 col-form-label">
                Start Date
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="date"
                  className={`${styles["mb-1"]} form-control`}
                  name="d-start"
                  required
                  value={newRequest.leave_begin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="d-start" className="col-sm-3 col-form-label">
                End Date
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="date"
                  className="form-control"
                  name="d-end"
                  required
                  value={newRequest.leave_end}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-dark"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-dark">
              Apply
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestPage;
