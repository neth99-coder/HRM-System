import React from "react";

import Header from "./Components/Header/Header.js";

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
    name: "Poorna Jayakodi",
    post: "Admin",
  };

  return (
    <div>
      <Header companyDetails={companyDetails} profileDetails={profileDetails}/>
    </div>
  );
}

export default App;
