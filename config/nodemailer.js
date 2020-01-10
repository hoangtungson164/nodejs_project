require('dotenv').config();
var nodemailer = require("nodemailer");

exports.smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});
