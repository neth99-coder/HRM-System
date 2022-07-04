import { React, useState } from 'react'
import styles from './Request.module.css'
import { Modal } from 'react-bootstrap'
import Axios from 'axios'
import { saveAs } from 'file-saver'

const Request = (props) => {
  const [showA, setShowA] = useState(false)
  const handleCloseA = () => setShowA(false)
  const handleShowA = () => setShowA(true)

  const [showR, setShowR] = useState(false)
  const handleCloseR = () => setShowR(false)
  const handleShowR = () => setShowR(true)

  const handleApprove = async (e) => {
    e.preventDefault()
    const value = e.target.name
    //console.log(e.target.name);
    const data = { leave_request_id: value }
    await Axios.post('http://localhost:3001/api/supervisor/approve', data).then(
      (res) => {
        if (!res.data.success) {
          alert('Error occured !!')
        } else {
          handleCloseA()
          window.location.reload(false)
        }
      },
    )
  }

  const handleReject = async (e) => {
    e.preventDefault()
    const value = e.target.name
    const data = { leave_request_id: value }
    //console.log(e.target.name);
    await Axios.post('http://localhost:3001/api/supervisor/reject', data).then(
      (res) => {
        if (!res.data.success) {
          alert('Error occured !!')
        } else {
          handleCloseA()
          window.location.reload(false)
        }
      },
    )
  }

  return (
    <div
      className={`${styles['row']} row border border-3 border-top border-light`}
    >
      <div className="col text-center ">
        <div>
          <img src={props.dp} alt="prof-pic" className={`${styles['dp']}`} />
          {props.cur.first_name + ' ' + props.cur.last_name}
        </div>
      </div>
      <div className="col text-center">{props.cur.type}</div>
      <div className="col text-center">
        {props.cur.leave_begin + ' - ' + props.cur.leave_end}
      </div>
      <div className="col-3 text-center">{props.cur.reason}</div>
      <div className="col-1 text-center">
        {props.cur.attachment ? (
          <button
            className="btn btn-primary btn-outline"
            onClick={() => {
              saveAs(
                `http://localhost:3001/attachments/${props.cur.attachment}`,
                'attachment.pdf',
              )
            }}
          >
            {' '}
            Download
          </button>
        ) : (
          <h6>No attachment available</h6>
        )}
      </div>{' '}
      {/*  TODO: attchement downlaod */}
      <div className="col text-center">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-success btn-outline"
            onClick={handleShowA}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-danger btn-outline"
            onClick={handleShowR}
          >
            Reject
          </button>
        </div>
      </div>
      <Modal show={showA} onHide={handleCloseA} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Approval - {props.cur.first_name}</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">
                Are you sure you want to approve this request?
              </label>
              <input
                type="text"
                className="form-control"
                name="req-id-r"
                value={props.cur.leave_request_id}
                hidden
                readOnly
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleCloseA}
            >
              No
            </button>
            <button
              type="submit"
              className="btn btn-dark"
              name={props.cur.leave_request_id}
              onClick={handleApprove}
            >
              Yes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={showR} onHide={handleCloseR} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Rejection - {props.cur.first_name}</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">
                Are you sure you want to reject this request?
              </label>
              <input
                type="text"
                className="form-control"
                name="req-id-r"
                value={props.cur.leave_request_id}
                hidden
                readOnly
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleCloseR}
            >
              No
            </button>
            <button
              type="submit"
              className="btn btn-dark"
              name={props.cur.leave_request_id}
              onClick={handleReject}
            >
              Yes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Request
