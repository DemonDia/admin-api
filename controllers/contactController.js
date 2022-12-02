const Contact = require("../models/contactModel");
const User = require("../models/userModel");

// ========================get all contacts on db========================
const getAllContacts = async (req, res) => {
    await Contact.find()
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
};
// ========================get all user contacts on db========================
const getUserContacts = async (req, res) => {
    userId = req.params.userId;
    if (userId.length != 24) {
        res.send({
            success: false,
            message: "User does not exist",
        });
    } else {
        const getUser = await User.findOne({ _id: userId });
        if (!getUser) {
            res.send({
                success: false,
                message: "User does not exist",
            });
        } else {
            await Contact.find({ userId: userId })
                .then((result) => {
                    res.send({
                        success: true,
                        data: result,
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        message: err,
                    });
                });
        }
    }
};
// ========================add contact to db========================
const addContact = async (req, res) => {
    const userId = req.body.userId;
    if (userId.length != 24) {
        res.send({
            success: false,
            message: "User does not exist",
        });
    } else {
        const getUser = await User.findOne({ _id: userId });
        if (!getUser) {
            res.send({
                success: false,
                message: "User does not exist",
            });
        } else {
            const newContact = new Contact({
                userId,
                contactname: req.body.contactname,
                contact: req.body.contactinfo,
            });

            await Contact.create(newContact)
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Contact added",
                        data: newContact._id,
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        message: err,
                    });
                });
        }
    }
};
// ========================update specific contact to db========================
const updateContact = async (req, res) => {};
// ========================delect specific contact from db========================
const deleteContact = async (req, res) => {};

module.exports = {
    getAllContacts,
    getUserContacts,
    addContact,
    updateContact,
    deleteContact,
};
