import { React, useEffect, useState } from 'react'
import { Form, FormGroup } from 'reactstrap'
import styles from './CompanyDetailsComponent.module.css'
import { Link } from 'react-router-dom'
import authService from '../../../services/auth.service'
import Axios from 'axios'


function CompanyDetailsComponent(props) {
  const [companyDetails, setCompanyDetails] = useState([])
  const [name, setName] = useState('')
  const [address_1, setAddress_1] = useState('')
  const [address_2, setAddress_2] = useState('')

  useEffect(() => {
      const load =  ()=>{
         Axios.get('http://localhost:3001/api/admin/getCompanyDetails', {
              headers: { 'x-auth-token': authService.getUserToken() },
            }).then((res) => {
              setCompanyDetails(res.data.result)
              setName(companyDetails.name)
              setAddress_1(companyDetails.addressLine1)
              setAddress_2(companyDetails.addressLine2)
            })
      }
  
      load()
  }, [])

  const updateCompanyDetails = (data)=>{
    Axios.post('http://localhost:3001/api/admin/updateCompanyDetails',data, {
      headers: {
        'x-auth-token': authService.getUserToken(),
      },
    }).then((res) => {
      if (res.data.success) {
        alert('successfully updated')
      } else {
        alert('a fail')
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateCompanyDetails({...companyDetails,'name':name,'addressLine1':address_1,'addressLine2':address_2})
  }

  return (
    <div className={styles['main']}>
      <div>
        <h1>Company Details</h1>

        <Form onSubmit={handleSubmit}>
          <div className={`${styles['form-field']}`}>
            <FormGroup>
              <label className={`${styles['label']}`} htmlFor="name">
                Company Name
              </label>
              <input
                type="text"
                className={`${styles['input-text']}`}
                id="name"
                name="name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </div>

          <div className={`${styles['form-field']}`}>
            <label className={`${styles['label']}`} htmlFor="address">
              Company Address
            </label>
            <div class="row">
              <div class="col">
                <FormGroup>
                  <input
                    type="text"
                    className={`${styles['input-text']}`}
                    id="address"
                    name="address"
                    required={true}
                    value={address_1}
                    onChange={(e) => setAddress_1(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div class="col">
                <FormGroup>
                  <input
                    type="text"
                    className={`${styles['input-text']}`}
                    id="address"
                    name="address"
                    required={true}
                    value={address_2}
                    onChange={(e) => setAddress_2(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className=" row gutters">
            <div className="col-12">
              <div className="text-right">
                <Link to={'/admin'}>
                  <button
                    type="button"
                    id="cancel"
                    name="cancel"
                    style={{ marginRight: '10px' }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  id="submit"
                  name="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CompanyDetailsComponent
