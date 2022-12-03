const mongoose = require("mongoose")
const skillSchema = mongoose.Schema({
    skillName:{
        type:String,
        required:[true,"Please add a name"]
    },
    year:{
        type:String,
        required:[true,"Please add a year"]
    },
    userId:{
        type:String,
        required:[true,"Please add a user"]
    }
})

module.exports = mongoose.model("Skill",skillSchema)