const mongoose = require("mongoose")

const notes = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3
    },
    description:{
        type:String
    },
    authorName:{

        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    file:{
        data:Buffer,
        contentType:String
    },
    referenceLink:{
        type:String
    },
    notes:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    category:{
        type:String,
        enum:["Web-dev-III","Physics","Maths","Chemistry","General"],
        required:true
    }
})

const notesSchema = mongoose.model("note",notes);
module.exports = notesSchema