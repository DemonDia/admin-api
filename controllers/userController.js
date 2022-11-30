const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// ========================register========================
const registerUser = asyncHandler(async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
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
    });
    await User.create(newUser)
        .then((result) => {
            res.send({
                success: true,
                message: "Registration successful",
                token: generateJWT(newUser._id),
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
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log(jwt);
        res.send({
            success: true,
            message: "Login successful",
            token: generateJWT(user._id),
        });
    } else {
        res.send({
            success: false,
            message: "Invalid pasword or user",
        });
    }
});

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

const getMe = asyncHandler(async (req,res)=>{
    const {_id,username,email} = await User.findById(req.user.id);
    res.send({
        id:_id,
        username,
        email
    })
})

module.exports = { registerUser, loginUser, getAllUsers,getMe };
