const Contact = require("../models/contact.model");

const sendMessage = async(req, res)=>{
    try {
        const {username, email, reason, message = ""} = req.body;

        if(!username || !email || !reason){
            return res.status(400).json({success: false, message: "Field the required Input"});
        }

        await Contact.create({username, email, reason, message });

        return res.status(200).json({success: true, message: "Message send successful"});
    } catch (error) {
        console.log("Error in sending messsage", error);
        return res.status(500).json({success: false, message: "Error in sending message", error});
    }
}

module.exports = sendMessage;