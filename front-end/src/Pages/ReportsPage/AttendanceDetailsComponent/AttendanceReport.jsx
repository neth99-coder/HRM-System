import React from 'react'
import defaultPic from '../../../assets/profile_picture/default.jpg'
import styles from './AttendanceReport.module.css'
import { Card, CardBody, CardFooter } from 'reactstrap'
import { useEffect } from 'react'

const AttendanceReport = React.forwardRef((props, ref) => {
  const profileStyleClass = 'rounded-circle ' + styles['profile-dp']

  const findJobByID = () => {
    for (let jobType in props.jobTypes) {
      if (props.jobTypes[jobType].job_type_id === props.employee.job_type_id)
        return props.jobTypes[jobType].job_type_title
    }
  }

  const findDepartmentByID = () => {
    for (let department in props.departments) {
      if (props.departments[department].dept_id === props.employee.dept_id)
        return props.departments[department].name
    }
  }

  return (
    <div className={`${styles['card']} float-center`} ref={ref}>
      {/*Profile picture and basic information*/}

      <Card>
        <CardBody>
          <div
            className="d-flex justify-content-center"
            style={{ margin: '20px' }}
          >
            <h3>Attendance Report</h3>{' '}
          </div>

          <div
            className=""
            style={{ display: 'flex', justifyContent: 'center', flex: '100%' }}
          >
            <img
              src={
                props.employee.profile_picture
                  ? `http://localhost:3001/profilePictures/${props.employee.profile_picture}`
                  : defaultPic
              }
              alt={'text'}
              className={profileStyleClass}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'block' }}>
              <strong>
                {props.employee.first_name + ' ' + props.employee.last_name}
              </strong>
            </div>
            <div style={{ display: 'block' }}>
              <p className="text-secondary mb-1">{findJobByID()}</p>
            </div>
            <div style={{ display: 'block' }}>
              <p className="text-muted font-size-sm">
                {findDepartmentByID()}
                {' Department'}
              </p>
            </div>
          </div>

          <div className="row" style={{ marginTop: '50px', marginLeft: '1px' }}>
            <div className="col">
              <p>
                {'From : '} {props.start_date}
              </p>{' '}
            </div>
            <div className="col d-flex flex-column align-items-end text-end">
              {' '}
              <p>
                {'To : '} {props.end_date}
              </p>
            </div>
          </div>
          {props.result.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.result.map((cur) => {
                  return (
                    <tr>
                      <td>{cur.date}</td>
                      <td>{cur.is_present == 1 ? 'Present' : 'Absent'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <strong>No results were found</strong>
            </div>
          )}
        </CardBody>
        {props.result.length !== 0 && (
          <CardFooter>
            <div className={`${styles['percentage-box']}`}>
              <div className={`${styles['tags']} row`}>
                <div className="col">{'Total no of days : '}</div>
                <div className={`${styles['result']} col`}>
                  {props.result.length}
                  {' day/s'}
                </div>
              </div>
              <div className={`${styles['tags']} row`}>
                <div className="col">{'Present : '} </div>
                <div className={`${styles['result']} col`}>
                  {
                    props.result.filter((record) => record.is_present == 1)
                      .length
                  }{' '}
                  {' day/s'}
                </div>
              </div>
              <div className={`${styles['tags']} row`}>
                <div className="col">{'Absent : '}</div>
                <div className={`${styles['result']} col`}>
                  {
                    props.result.filter((record) => record.is_present == 0)
                      .length
                  }{' '}
                  {' day/s'}
                </div>
              </div>
              <div className={`${styles['tags']} row`}>
                <div className="col">{'Percentage: '}</div>
                <div className={`${styles['result']} col`}>
                  {(props.result.filter((record) => record.is_present == 1)
                    .length /
                    props.result.length) *
                    100}{' '}
                  {' %'}
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
})

export default AttendanceReport
