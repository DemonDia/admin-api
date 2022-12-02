const Skill = require("../models/skillModel");
const User = require("../models/userModel");
// ========================get all skills on db========================
const getAllSkills = async (req, res) => {
    await Skill.find()
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
// ========================get skills of a user========================
const getUserSkills = async (req, res) => {
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
            await Skill.find({ userId: userId })
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
// ========================add a skill to db========================
const addSkill = async (req, res) => {
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
            const newSkill = new Skill({
                userId,
                skillname: req.body.skillname,
                year: req.body.year,
            });

            await Skill.create(newSkill)
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Skill added",
                        data: newSkill._id,
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

// ========================edit a skill on db========================
const updateSkill = async (req, res) => {
    await Skill.findById(req.body.id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Skill does not exist!",
            });
        } else {
            if (result.userId != req.body.userId) {
                res.send({
                    success: false,
                    message: "User does not have that skill",
                });
            } else {
                Skill.updateOne(
                    { _id: result._id },
                    { skillname: req.body.name, year: req.body.year }
                )
                    .then((result) => {
                        res.send({
                            success: true,
                            message: "Skill updated",
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
// ========================delete a skill on db========================
const deleteSkill = async (req, res) => {
    const skillId = req.params.skillId;
    if (skillId.length != 24) {
        res.send({
            success: false,
            message: "Skill does not exist!",
        });
    } else {
        await Skill.findById(skillId).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Skill does not exist!",
                });
            } else {
                if (result.userId != req.body.userId) {
                    res.send({
                        success: false,
                        message: "User does not have that skill",
                    });
                } else {
                    Skill.deleteOne(result)
                        .then((deleteResult) => {
                            console.log(deleteResult);
                            res.send({
                                success: true,
                                message: "Skill deleted",
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
        });
    }
};

module.exports = {
    getAllSkills,
    addSkill,
    getUserSkills,
    updateSkill,
    deleteSkill,
};
