const { transporter } = require("./configure")

const sendEmail = async (emailType, content) => {
    console.log(content)
    const { user, token,recipient } = content;
    const { _id, username } = user;
    // content contains the following:
    // recipient email
    // user
    // token
    emailSubject = "";
    emailContent = "";
    route = "";
    if (emailType == "verificationEmail") {
        emailSubject = "Account verification";
        linkToClick = ` ${process.env.USER_INTERFACE}/verify/${_id}/${token}`;
        emailContent = `<p>Hello ${username},</p> <p>please click on <a target ="_blank" href = "${linkToClick}">this</a> link to verify your account.<p>`;
    } else if (emailType == "forgotPassword") {
        emailSubject = "Forgot your password?";
        emailContent = "";
    }
    await transporter.sendMail({
        from: `"Portfolio Site" ${process.env.TRANSPORTER_AUTH_USER}`, // sender address
        to: recipient, // list of receivers
        subject: emailSubject, // Subject line
        html: emailContent, // html body
    });
};

module.exports = {sendEmail}