import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

// Route imports
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RequestPage from "../Pages/RequestPage/RequestPage";

export default function AppRouter() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/requests" element={<RequestPage/>} />
        </Routes>
      </>
    </Router>
  );
}
