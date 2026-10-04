const express = require("express");
const sendMessage = require("../controllers/contact.controller");

const router = express.Router();

router.post('/send-message', sendMessage);

module.exports = router;