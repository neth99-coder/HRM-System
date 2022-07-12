const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  // Option 1
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token
  // Option 2


  const token = req.header("x-auth-token");
  // console.log("===============");
  // const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // console.log(user);

  // If token not found, send error message
 
  
  if (!token) {
    console.log("Token Not Found!")
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }else{
  // Authenticate token
  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.tokenEmpId = user.id;
    req.tokenUserType = user.type;

    if(user.type !== 4){
        

        return res.status(403).json({
            errors: [
              {
                msg: "unauthorized access",
              },
            ],
          });
    }

    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
  }


};

module.exports = authToken;
