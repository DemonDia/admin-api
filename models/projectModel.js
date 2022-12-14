const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    projectName:{
        // project name
        type:String,
        required:[true,"Please add a name"]
    },
    year:{
        // pubished year
        type:String,
        required:[true,"Please add a year"]
    },
    description:{
        // string array
        type:Array,
        required:[true,"Please add some description"]
    },
    techStacks:{
        // string array
        type:Array,
        required:[true,"Please add some tech stacks"]
    },
    links:{
        // Object array with the following properties:
        // LinkName
        // LinkURL
        type:Array,
        required:[true,"Please add some links"]
    },
    components:{
        // Object array with the following properties
        // ComponentName
        // ComponentLink
        type:Array,
        required:[true,"Please add some components if any"]
    },
    userId:{
        type:String,
        required:[true,"Please add a user"]
    }
})
module.exports = mongoose.model("Project",projectSchema)