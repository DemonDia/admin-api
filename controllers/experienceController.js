const Experience = require("../models/experienceModel");
const User = require("../models/userModel");

// ========================get all experiences on db========================
const getAllExperiences = async (req, res) => {
    await Experience.find()
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
// ========================get all user experiences on db========================
const getUserExperiences = async (req, res) => {
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
            await Experience.find({ userId: userId })
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
const updateExperience = async (req, res) => {
    await Experience.findById(req.body.id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Experience does not exist!",
            });
        } else {
            if (result.userId != req.body.userId) {
                res.send({
                    success: false,
                    message: "User does not have that experience",
                });
            } else {
                Experience.updateOne(
                    { _id: result._id },
                    {
                        rolename: req.body.rolename,
                        companyname: req.body.companyname,
                        comapanysite: req.body.comapanysite,
                        starting: req.body.starting,
                        ending: req.body.ending,
                        details: req.body.details,
                    }
                )
                    .then((result) => {
                        res.send({
                            success: true,
                            message: "Experience updated",
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
// ========================delete an experience on db========================
const deleteExperience = async (req, res) => {
    const experienceId = req.params.experienceId;
    if (experienceId.length != 24) {
        res.send({
            success: false,
            message: "Experience does not exist!",
        });
    } else {
        await Experience.findById(experienceId).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Experience does not exist!",
                });
            } else {
                Experience.deleteOne(result)
                    .then((deleteResult) => {
                        console.log(deleteResult);
                        res.send({
                            success: true,
                            message: "Experience deleted",
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
        });
    }
};

module.exports = {
    getAllExperiences,
    getUserExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
};
