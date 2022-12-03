const mongoose = require("mongoose")
const contactSchema = mongoose.Schema({
    contactName:{
        type:String,
        required:[true,"Please add a name"]
    },
    contact:{
        type:String,
        required:[true,"Please add a link/tag/email"]
    },
    userId:{
        type:String,
        required:[true,"Please add a user"]
    }
})

module.exports = mongoose.model("Contact",contactSchema)