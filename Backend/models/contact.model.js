const mongoose =  require("mongoose");

const contactSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    message: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model("Contact", contactSchema);
