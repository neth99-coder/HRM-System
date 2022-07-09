import React from "react";
import styles from "./StaffDetailsReport.module.css";
import { Card, CardBody, CardFooter } from "reactstrap";

const StaffDetailsReport = React.forwardRef((props, ref) => {
  const profileStyleClass = "rounded-circle " + styles["profile-dp"];

  

  return (
    <div className={`${styles["card"]} float-center`} ref={ref}>
      {/*Profile picture and basic information*/}

      <Card>
        <CardBody>
          <div style={{ textAlign: 'center',marginBottom:'30px'}}>
            <h3 >
              {"Staff details"}
            </h3>{" "}
            <div><strong style={{letterSpacing:'2px'}}>{props.topic}</strong></div>
          </div>
        {props.result.length !== 0 ? (
          <table className="table">
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email</th>
              <th scope="col">Designation</th>
            </tr>
          </thead>
          <tbody>
            {props.result?.map((cur) => {
              return (
                <tr>
                  <td>{cur.emp_id}</td>
                  <td>{cur.first_name + " " + cur.last_name}</td>
                  <td>{cur.contact_num}</td>
                  <td>{cur.email}</td>
                  <td>{cur.job_type_title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        ):(
          <div style={{ textAlign: 'center' }}>
              <strong>No results were found</strong>
          </div>
        )}
          
        </CardBody>
      </Card>
    </div>
  );
});

export default StaffDetailsReport;
