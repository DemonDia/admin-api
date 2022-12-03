const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a phone number"],
    },
    activated: {
        type: Boolean,
        required: [true],
    }
});

module.exports = mongoose.model("User", userSchema);
