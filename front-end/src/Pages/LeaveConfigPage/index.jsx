import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/Header'

import { Button, Dropdown, Container, Nav, Form } from 'react-bootstrap'

import styled from './index.module.css'
import Axios from 'axios'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'

function LeaveConfigForm() {
  const [paygrade, setPaygrade] = useState('Select Paygrade')
  const [paygrades, setPaygrades] = useState([])
  const [leaves, setLeaves] = useState({
    Casual: 0,
    Medical: 0,
    Annual: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get('http://localhost:3001/api/hrManager/getPaygrades', {
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      setPaygrades(res.data.result)
    })
  }, [])


  const loadConfigData = (paygrade_id)=>{
    Axios.get(`http://localhost:3001/api/hrManager/getConfigValues/${paygrade_id}`,{
      headers: { 'x-auth-token': authService.getUserToken() },
    }).then((res) => {
      let values = {}
      if(res.data.result.length != 0){
        res.data.result.map((row)=>{
          const type = Object.keys(leaves)[row.leave_id-1];
          values[type] = row.num_of_leaves;
        })
      }else{
        values = {
          Casual:0,
          Medical:0,
          Annual:0
        }
      }
      setLeaves(values)
  })
    
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault()
    let success = false
    for(let i=0 ; i < Object.keys(leaves).length ; i++){
      const data = {
        paygrade_id: paygrade,
        leave_id: i + 1,
        leaves: parseInt(leaves[Object.keys(leaves)[i]])
      }

        await Axios.post('http://localhost:3001/api/hrManager/updateleaveConfig', data, {
          headers: {
            'x-auth-token': authService.getUserToken(),
          },
        }).then((res) => {
          success = res.data.success
        })
    }
    if(success){
      setLeaves({
        Casual:0,
        Medical:0,
        Annual:0
      })
      alert("successfully added")
    }else{
      alert("failed")
    }
  }

return (
  <>
    <Form
      className={`${styled['main-form']} ${styled['admin-form']}`}
      onSubmit={handleSubmit}
    >
      <h3 className={styled['form-title']}>Leave Configeration</h3>

      <Dropdown className={styled['paygrade-select-container']}>
        <Dropdown.Toggle
          className={styled['paygrade-select']}
          variant="primary"
          id="dropdown-basic"
        >
          <span className={styled['paygrade-text']}>{paygrades[paygrade - 1]?paygrades[paygrade - 1 ].name:"Select Paygrade"}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {paygrades.map(({ paygrade_id, name }, index) => (
            <Dropdown.Item
              onClick={() => {
                loadConfigData(paygrade_id)
                setPaygrade(paygrade_id)
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Casual Leaves</Form.Label>
        <Form.Control
          type="number"
          value={leaves['Casual']}
          onChange={(e) => {
            setLeaves({ ...leaves, Casual: e.target.value })
          }}
          placeholder="Enter number of casual leaves"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Medical Leaves</Form.Label>
        <Form.Control
          type="number"
          value={leaves['Medical']}
          onChange={(e) => {
            setLeaves({ ...leaves, Medical: e.target.value })
          }}
          placeholder="Enter number of casual leaves"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Annual Leaves</Form.Label>
        <Form.Control
          type="number"
          value={leaves['Annual']}
          onChange={(e) => {
            setLeaves({ ...leaves, Annual: e.target.value })
          }}
          placeholder="Enter number of casual leaves"
          required
        />
      </Form.Group>

      {/* Validation part before changing the Leaves */}

      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Save Changes
      </Button>
    </Form>
  </>
)
        }
function LeaveConfigPage() {
  // Need to import these details from the server
  const companyDetails = {
    logo: 'logo.png',
    name: 'Jupiter Apperels',
    addressLine1: 'paravi Island',
    addressLine2: 'Matara',
  }

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
  )
}

export default LeaveConfigPage
