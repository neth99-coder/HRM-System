import ToggleSwitch from '../../Components/UI/ToggleSwitch/ToggleSwitch';
import styles from "./Data.module.css";

const Data = (props) => {
    return (
        <div
        className={`${styles["row"]} row border border-3 border-top border-light`}
        //   id = {employee.emp_id}
      >
        <div className="col text-center ">{props.employee.emp_id}</div>
        <div className="col text-center">{props.employee.first_name}</div>
        <div className="col text-center">{props.employee.last_name}</div>

        <div className="col text-center">


            <ToggleSwitch id ={props.employee.emp_id} label={props.show} handleToggle={props.handleToggle} />

        </div>

      </div>
    );
};

export default Data;
