import { React, useEffect, useState } from 'react'
import CompanyDetailsComponent from './CompanyDetailsComponent/CompanyDetailsComponent'
import authService from '../../services/auth.service'
import Axios from 'axios'

function CompanyDetailsPage(props) {

  return (
    <div>
      <CompanyDetailsComponent/>
    </div>
  )
}

export default CompanyDetailsPage
