const Experience = require("../models/experienceModel");
const User = require("../models/userModel");

// ========================get all experiences on db========================
const getAllExperiences = async (req, res) => {};
// ========================get all user experiences on db========================
const getUserExperiences = async (req, res) => {};
// ========================add an experience to db========================
const addExperience = async (req, res) => {
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
            const newExperience = new Experience({
                rolename: req.body.rolename,
                companyname: req.body.companyname,
                comapanysite: req.body.comapanysite,
                starting: req.body.starting,
                ending: req.body.ending,
                details: req.body.details,
                userId,
            });

            await Experience.create(newExperience)
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Experience added",
                        data: newExperience._id,
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
// ========================update specific experience on db========================
const updateExperience = async (req, res) => {};
// ========================delete a skill on db========================
const deleteExperience = async (req, res) => {};

module.exports = {
    getAllExperiences,
    getUserExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
};
