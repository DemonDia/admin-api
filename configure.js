const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.TRANSPORTER_AUTH_USER, 
        pass: process.env.TRANSPORTER_AUTH_PASSWORD, 
    },
});

module.exports = {transporter}