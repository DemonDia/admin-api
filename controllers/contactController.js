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
const getUserContacts = async (req, res) => {};
// ========================add contact to db========================
const addContact = async (req, res) => {};
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
