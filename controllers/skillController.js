const Skill = require("../models/skillModel");
const User = require("../models/userModel");
// ========================get all skills on db========================
const getAllSkills = async (req, res) => {
    console.log("LOL");
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
                    console.log(result);
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
// ========================add a skill on db========================
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
            Skill.updateOne(
                { _id: result._id },
                { skillname: req.body.name, year: req.body.year }
            ).then((result) => {
                res.send({
                    success: true,
                    message: "Skill updated",
                });
            });
        }
    });
};
// ========================delete a skill on db========================
const deleteSkill = async (req, res) => {
    const skillId = req.body.id;
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
                Skill.deleteOne(result).then((result) => {
                    console.log(result);
                    res.send({
                        success: true,
                        message: "Skill deleted",
                    });
                });
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
