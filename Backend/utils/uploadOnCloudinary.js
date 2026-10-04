const cloudinary = require('../config/cloudinary')
const fs = require("fs/promises");


const uploadOnCloudinary = async(filePath)=>{

    try {
        if(!filePath)  return null;

        const response = await cloudinary.uploader.upload(filePath, {resource_type: 'auto'})
 
        await fs.unlink(filePath);

        return response;
    } catch (error) {
        console.log("Cloudinary Upload Error", error);
        if (filePath) {
            try {
                await fs.unlink(filePath);
            } catch (err) {
                console.log("Failed to delete local file:", err.message);
            }
        }

        return null;
    }

}

module.exports = uploadOnCloudinary;

