import jwt_decode from "jwt-decode";

const getCurrentUser = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

const getUserID = () => {
  if (localStorage.getItem("user")) {
    const { id } = jwt_decode(localStorage.user);
    return id;
  }
  return null;
};

const getUserType = () => {
  if (localStorage.getItem("user")) {
    const { type } = jwt_decode(localStorage.user);
    return type;
  }
  return null;
};

const logout = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    return true;
  }
  return false;
};
const getUserToken = () => {
  if (localStorage.getItem("user")) {
    return localStorage.getItem("user");
  }
  return null;
};
const authService = {
  logout,
  getCurrentUser,
  getUserID,
  getUserType,
  getUserToken,
};

export default authService;
