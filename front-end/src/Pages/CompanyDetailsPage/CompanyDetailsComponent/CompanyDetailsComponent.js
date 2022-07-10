import { React, useEffect, useState } from 'react'
import { Form, FormGroup } from 'reactstrap'
import styles from './CompanyDetailsComponent.module.css'
import { Link } from 'react-router-dom'

function CompanyDetailsComponent(props) {
  const [name, setName] = useState(props.companyDetails.name)
  const [address_1, setAddress_1] = useState(props.companyDetails.addressLine1)
  const [address_2, setAddress_2] = useState(props.companyDetails.addressLine2)

  useEffect(() => {
    console.log(props)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
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
