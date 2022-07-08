import React from 'react'
import defaultPic from '../../../assets/profile_picture/default.jpg'
import styles from './AttendanceReport.module.css'
import { Card, CardBody, CardFooter } from 'reactstrap'
import { useEffect } from 'react'

const AttendanceReport = React.forwardRef((props, ref) => {
  const profileStyleClass = 'rounded-circle ' + styles['profile-dp']

  useEffect(() => {
    console.log()
  }, [])

  return (
    <div className={`${styles['card']} float-center`} ref={ref}>
      {/*Profile picture and basic information*/}

      <Card>
        <CardBody>
          <div className="">
            <div className="d-flex justify-content-center">
              <h1>Attendance Report</h1>{' '}
            </div>

              <div className="" style={{display:''}}>
                <img
                  src={defaultPic}
                  alt={'text'}
                  className={profileStyleClass}
                  
                />
                <div className="">
                  <h4>{"props.name"}</h4>
                  <p className="text-secondary mb-1">{'props.job'}</p>
                  <p className="text-muted font-size-sm">
                    {'props.department'}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5>
                  {'From : '} {props.start_date}
                </h5>{' '}
              </div>
              <div className="col d-flex flex-column align-items-end text-end">
                {' '}
                <h5>
                  {'To : '} {props.end_date}
                </h5>
              </div>
            </div>
         
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
        </CardBody>
        <CardFooter>
          <div className={`${styles['percentage-box']}`}>
            <div className="row">
              {'Total no of days : '} {props.result.length}
              {' day/s'}
            </div>
            <div className="row">
              {'Present : '}{' '}
              {props.result.filter((record) => record.is_present == 1).length}{' '}
              {' day/s'}
            </div>
            <div className="row">
              {'Absent : '}
              {
                props.result.filter((record) => record.is_present == 0).length
              }{' '}
              {' day/s'}
            </div>
            <div className="row">
              {'Percentage: '}
              {(props.result.filter((record) => record.is_present == 1).length /
                props.result.length) *
                100}{' '}
              {' %'}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
})

export default AttendanceReport
