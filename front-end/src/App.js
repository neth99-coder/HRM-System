import React from "react";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Header from "./Components/Header/Header.js";
import AdminFront from "./adminFrontPage/adminFront.js";

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
    name: "Poorna Cooray",
    post: "Admin",
  };

  return (
    <div>
      <Router>
        <Header companyDetails={companyDetails} profileDetails={profileDetails}/>
        <Routes>
          <Route path="/" exact element = {<AdminFront />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
