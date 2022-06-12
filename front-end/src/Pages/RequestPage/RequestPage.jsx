import { React, useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Form, Modal, Spinner } from "react-bootstrap";
import Axios from "axios";

import styles from "./RequestPage.module.css";
import RequestCard from "./RequestCard";

const RequestPage = () => {
  const [types, setTypes] = useState([{ leave_id: 0, type: "All" }]); //reason types          ----> this should not be reasons as now
  const [requests, setRequests] = useState([]); //requests array
  const [newRequest, setNewRequest] = useState({
    emp_id: "190253K",
    supervisor_id: "190110V",
    leave_id: "",
    state_id: 3,
    reason: "",
    leave_begin: "",
    leave_end: ""
  });
  const [arr1, setArr1] = useState([]);
  const [validated, setValidated] = useState(false); //form validation

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); //maodal show
  const handleClose = () => setShow(false); //handle modal close
  const handleShow = () => setShow(true); //handle modal show

  useEffect(() => {
    //setTypes(arr2);
    setIsLoading(true);
    const getTypes = async () => {
      
      await Axios.get("http://localhost:3001/api/employee/getLeaveTypes").then(
        (res) => {
          //console.log(res.data.result);
          setTypes((prevVal) => {
            return [prevVal[0], ...res.data.result];
          });
        }
      );
    };
    getTypes();

    const getRequests = async () => {
      await Axios.get(
        "http://localhost:3001/api/employee/getLeaveRequests/190253K"
      ).then((res) => {
        //console.log(res.data.result);
        setArr1(res.data.result);
        setRequests(res.data.result);
        setIsLoading(false);
      });

    };
    getRequests();

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
          return id === request.type;
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
      Axios.post(
        "http://localhost:3001/api/employee/addLeaveRequest",
        newRequest
      ).then((res) => {
        if (!res.data.success) {
          alert("Error occured !!");
        } else {
          setNewRequest({
            emp_id: "190253K",
            superviser_id: "190110V",
            leave_id: "",
            state_id: 3,
            reason: "",
            leave_begin: "",
            leave_end: ""
          });
          handleClose();
          window.location.reload(false); //refresh page
        }
      });
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
    const temp = types.filter((cur) => {
      return cur.type === type;
    });
    setNewRequest((prevVal) => {
      return { ...prevVal, leave_id: temp[0].leave_id };
    });
  }

  return (
    <div>
            {isLoading ? (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      <>  
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
                    id={cur.type + "-li"}
                  >
                    <p className="page-link" id={cur.type}>
                      {cur.type}
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
                Supervisor ID
              </label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  className={`${styles["mb-1"]} form-control`}
                  name="sup-id"
                  required
                  value={newRequest.superviser_id}
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
                    return cur.type !== "All" && <option> {cur.type} </option>;
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
      </>)}
    </div>
  );
};

export default RequestPage;
