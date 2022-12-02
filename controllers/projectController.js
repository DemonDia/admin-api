const Project = require("../models/projectModel");
const User = require("../models/userModel");

// ========================get all projects on db========================
const getAllProjects = async (req, res) => {
    await Project.find()
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
// ========================get all user projects on db========================
const getUserProjects = async (req, res) => {
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
            await Project.find({ userId: userId })
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
// ========================add a project to db========================
const addProject = async (req, res) => {};
// ========================get project by ID========================
const getProjectById = async (req, res) => {};
// ========================update specific project on db========================
const updateProject = async (req, res) => {};
// ========================delete a project from db========================
const deleteProject = async (req, res) => {};
module.exports = {
    getAllProjects,
    getUserProjects,
    addProject,
    getProjectById,
    updateProject,
    deleteProject,
};
