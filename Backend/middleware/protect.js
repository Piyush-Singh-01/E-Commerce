const User = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const protect = async(req, res, next)=>{
  try {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg: "Token not found", success: false})
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        return res.status(403).json({msg: "Invalid token", success: false})
    }

    const user = await User.findById(decoded.id).select("-password");

    if(!user){
        return res.status(401).json({msg: "User not found", success: false})
    }

    req.user = user;

    next();
    
  } catch (error) {

    console.log("Error in protect middleware", error);

    return res.status(500).json({msg: "Error in Verifying tokne", success: false})
  }
}

module.exports = protect;