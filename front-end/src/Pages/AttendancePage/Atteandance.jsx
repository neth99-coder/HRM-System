import styles from "./Attendance.module.css";

const Attendance = (props) => {
    return (
        <div
        className={`${styles["row"]} row border border-3 border-top border-light`}
        //   id = {employee.emp_id}
      >
        <div className="col text-center ">{props.employee.emp_id}</div>
        <div className="col text-center">{props.employee.first_name}</div>
        <div className="col text-center">{props.employee.last_name}</div>
        <div className="col text-center">{props.employee.name}</div>
        <div className="col text-center">{(props.employee.is_present === 1 ? "Present": "Absent")}</div>

      </div>
    );
};

export default Attendance;
