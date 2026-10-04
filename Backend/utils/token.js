const jwt = require("jsonwebtoken");

const genToken = async(userId)=>{
   try {
     const token = jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d",}       
    )
       return token;
   } catch (error) {
       console.log("Error in gen Token", error);
   }
}

module.exports = genToken;