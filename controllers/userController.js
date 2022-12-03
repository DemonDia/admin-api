const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("../misc");
// ========================register========================
const registerUser = asyncHandler(async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    if (!username || !email || !password) {
        res.send({
            success: false,
            message: "Please fill up all fields",
        });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.send({
            success: false,
            message: "User exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        activated: false,
    });
    await User.create(newUser)
        .then(async (result) => {
            const token = generateJWT(newUser._id);
            console.log(token);
            const content = {
                user: newUser,
                token: token,
                recipient: email,
            };
            await sendEmail("verificationEmail", content).then((result) => {
                res.send({
                    success: true,
                    message: "Registration successful",
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err,
            });
        });
});
// ========================JWT========================
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const verifyToken = async (token) => {
    console.log(token);
    if (token) {
        try {
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            currUser = await User.findById(decoded.id).select("-password");
            if (currUser) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};
// ========================login========================
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send({
            success: false,
            message: "Please fill up the fields",
        });
    }
    const user = await User.findOne({ email });
    if (user) {
        if (!user.activated) {
            res.send({
                success: false,
                message: "Please activate your account!",
            });
        } else {
            if (await bcrypt.compare(password, user.password)) {
                res.send({
                    success: true,
                    message: "Login successful",
                    token: generateJWT(user._id),
                });
            } else {
                res.send({
                    success: false,
                    message: "Invalid pasword",
                });
            }
        }
    } else {
        res.send({
            success: false,
            message: "Invalid user",
        });
    }
});
// ========================get all users========================
const getAllUsers = asyncHandler(async (req, res) => {
    await User.find()
        .then((result) => {
            res.send({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err,
            });
        });
});
// ========================get curr user========================
const getMe = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.send({
            success: false,
            message: "Invalid user",
        });
    } else if (req.user.id.length != 24) {
        res.send({
            success: false,
            message: "Invalid ID",
        });
    } else {
        const { _id, username, email } = await User.findById(req.user.id);
        // check token
        res.send({
            success: true,
            id: _id,
            username,
            email,
        });
    }
});
// ========================verify user========================
const verifyUser = asyncHandler(async (req, res) => {
    currentUser = await User.findById(req.params.userId);
    currentToken = req.params.token;
    validToken = verifyToken(currentToken);
    if (!validToken) {
        res.send({
            success: false,
            message: "Invalid token",
        });
    } else {
        if (!currentUser) {
            res.send({
                success: false,
                message: "User does not exist",
            });
        } else {
            if (!currentUser.activated) {
                User.updateOne({ _id: currentUser._id }, { activated: true })
                    .then((result) => {
                        res.send({
                            success: true,
                            message: "User verified",
                        });
                    })
                    .catch((err) => {
                        res.send({
                            success: false,
                            message: err,
                        });
                    });
            } else {
                res.send({
                    success: false,
                    message: "User already verified",
                });
            }
        }
    }
});
// ========================send forget pasword request========================
const sendForgetPasswordEmail = asyncHandler(async (req, res) => {
    const userEmail = req.body.email;
    await User.findOne({ email: userEmail })
        .then(async (result) => {
            if (result) {
                token = await generateJWT(result._id);
                if (result.activated) {
                    const content = {
                        user: result,
                        token: token,
                        recipient: result.email,
                    };
                    console.log("user", result);
                    await sendEmail("forgotPassword", content)
                        .then((result) => {
                            res.send({
                                success: true,
                                message: "Email sent",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.send({
                                success: true,
                                message: "",
                            });
                        });
                } else {
                    res.send({
                        success: true,
                        message: "",
                    });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: true,
                message: "",
            });
        });
});
// ========================change new password========================
const changeNewPassword = asyncHandler(async (req, res) => {
    const { newPassword, token, userId } = req.body;
    validToken = verifyToken(token);
    if (!validToken) {
        res.send({
            success: false,
            message: "Invalid token",
        });
    } else {
        currentUser = await User.findById(userId);
        if (!currentUser) {
            res.send({
                success: false,
                message: "Invalid user",
            });
        } else {
            if (newPassword.length < 8) {
                res.send({
                    success: false,
                    message: "Password must be at least 8 characters!",
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await User.updateOne(
                    { _id: currentUser._id },
                    { password: hashedPassword }
                )
                    .then((result) => {
                        res.send({
                            success: true,
                            message: "Password reset!",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send({
                            success: false,
                            message: err,
                        });
                    });
            }
        }
    }
});
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getMe,
    verifyUser,
    sendForgetPasswordEmail,
    changeNewPassword,
};
