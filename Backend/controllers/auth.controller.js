const User = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const genToken = require('../utils/token');


const getUser = async(req, res)=>{
    try {
        const user = req.user;
        if(user){
            return res.status(200).json({success: true, user})
        }
    } catch (error) {
        console.log("Error in getUser", error);
        return res.status(500).json({success: false, message: "Error getting current user"})
    }
}

const Signup = async(req, res) =>{
    try {
        const {username, email, password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message: "User already Exist"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password atleast 6 character"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const userCreated = await User.create({username, email, password: hashPassword});

        const token = await genToken(userCreated._id);
        
        const user = await User.findById(userCreated._id).select("-password");

        res.cookie("token", token, {
            secure: true,
            sameSite: "None",
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User Registerd Successfully",
            success: true,
            user
        })

    } catch (error) {
        console.log("Error in Signup", error)
        return res.status(500).json({message: "Signup server Error", success: false});
    }
}

const Login = async(req, res)=>{
      try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        
        if(!userExist){
            return res.status(400).json({message: "Invalid Email or Password", success:false})
        }

        const isValid = await bcrypt.compare(password, userExist.password);

        if(!isValid){
            return res.status(400).json({message: "Invalid Email or Password", success: false})
        }

        const token = await genToken(userExist._id);

        const user = await User.findById(userExist._id);

        res.cookie("token", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user
        })

      } catch (error) {
         console.log("Error in Login", error)
         return res.status(500).json({success: false, message: "Login server Error" });
      }
}

const Logout = async(req, res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "Logout Successfully", success: true})
    } catch (error) {
        console.log("Error in Logout", error)
        return res.status(500).json({message: "Logout error" , success: false});
    }
}

module.exports = {Signup, Login, Logout, getUser};
