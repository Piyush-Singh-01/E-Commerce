const cloudinary = require('../config/cloudinary')

const deleteFromCloudinary = async(publicId)=>{
    return cloudinary.uploader.destroy(publicId);
}

module.exports = deleteFromCloudinary;