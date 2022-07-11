import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import NavBar from '../../Components/Header/NavBarComponent/NavBarComponent'


function HeaderPage(props) {
  const [companyDetails, setCompanyDetails] = useState([])
  useEffect(() => {
    
  }, [])


  return (
    <div>
      <Header
        companyDetails={props.companyDetails}
        profileDetails={props.profileDetails}
        type={props.type}
      />
      <div className="mt-1">
        <NavBar type={props.type} />
      </div>
    </div>
  )
}

export default HeaderPage
