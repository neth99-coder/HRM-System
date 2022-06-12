import React from "react";

import Header from "./Components/Header/Header.js";
import RequestPage from "./Components/Employee/RequestPage/RequestPage.jsx";

import "./App.css";

function App() {
  const companyDetails = {
    logo: "logo.png",
    name: "Jupiter Apperels",
    addressLine1: "paravi Island",
    addressLine2: "Matara",
  };

  const profileDetails = {
    dp: "profile-pic.JPG",
    name: "Nethmi Jayakody",
    post: "Admin",
  };

  return (
    <div>
      <Header companyDetails={companyDetails} profileDetails={profileDetails}/>
      <RequestPage/>
    </div>
  );
}

export default App;
