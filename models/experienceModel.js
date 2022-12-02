const mongoose = require("mongoose")
const experienceSchema = mongoose.Schema({
    rolename:{
        type:String,
        required:[true,"Please add a role name"]
    },
    companyname:{
        type:String,
        required:[true,"Please add a company name"]
    },
    comapanysite:{
        type:String,
        required:false
    },
    starting:{
        type:String,
        required:[true,"Please add a start date"]
    },
    ending:{
        type:String,
        required:[true,"Please add an end date"]
    },
    details:{
        type:Array,
        required:[true,"Please describe the experience"]
    },
    userId:{
        type:String,
        required:[true,"Please add a user"]
    }
})

module.exports = mongoose.model("Experience",experienceSchema)