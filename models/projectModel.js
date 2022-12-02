const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    projectname:{
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
    techstacks:{
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
    }
})
module.exports = mongoose.model("Project",projectSchema)