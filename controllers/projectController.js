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
const addProject = async (req, res) => {
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
            const newProject = new Project({
                projectname: req.body.projectname,
                year: req.body.year,
                description: req.body.description,
                techstacks: req.body.techstacks,
                links: req.body.links,
                components: req.body.components,
                userId,
            });

            await Project.create(newProject)
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Project added",
                        data: newProject._id,
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
// ========================get project by ID========================
const getProjectById = async (req, res) => {
    const projectId = req.params.projectId;
    if (projectId.length != 24) {
        res.send({
            success: false,
            message: "Project is not found",
        });
    } else {
        await Project.findById(projectId)
            .then((result) => {
                if (!result) {
                    res.send({
                        success: false,
                        message: "Project is not found",
                    });
                } else {
                    res.send({
                        success: true,
                        data: result,
                    });
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: err,
                });
            });
    }
};
// ========================update specific project on db========================
const updateProject = async (req, res) => {
    await Project.findById(req.body.id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Project does not exist!",
            });
        } else {
            if (result.userId != req.body.userId) {
                res.send({
                    success: false,
                    message: "User does not have that project",
                });
            } else {
                Project.updateOne(
                    { _id: result._id },
                    {
                        projectname: req.body.projectname,
                        year: req.body.year,
                        description: req.body.description,
                        techstacks: req.body.techstacks,
                        links: req.body.links,
                        components: req.body.components,
                    }
                )
                    .then((result) => {
                        res.send({
                            success: true,
                            message: "Project updated",
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
    });
};
// ========================delete a project from db========================
const deleteProject = async (req, res) => {
    const projectId = req.params.projectId;
    if (projectId.length != 24) {
        res.send({
            success: false,
            message: "Project does not exist!",
        });
    } else {
        await Project.findById(projectId).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Project does not exist!",
                });
            } else {
                if (result.userId != req.body.userId) {
                    res.send({
                        success: false,
                        message: "User does not have that project",
                    });
                } else {
                    Project.deleteOne(result)
                        .then((deleteResult) => {
                            res.send({
                                success: true,
                                message: "Project deleted",
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
        });
    }
};
module.exports = {
    getAllProjects,
    getUserProjects,
    addProject,
    getProjectById,
    updateProject,
    deleteProject,
};
