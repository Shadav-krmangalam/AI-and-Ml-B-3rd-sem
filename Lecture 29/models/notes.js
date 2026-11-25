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
        ref:"user",
        required:true
    },
    category:{
        type:String,
       enum: [
    "Web Development",
    "Web Development-I",
    "Web Development-II",
    "Web Development-III",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Database Management",
    "Data Structures & Algorithms",
    "Python",
    "Java",
    "C Programming",
    "C++ Programming",
    "Operating Systems",
    "Computer Networks",
    "Computer Architecture",
    "Software Engineering",
    "Cyber Security",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "DevOps",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Statistics",
    "English",
    "Communication Skills",
    "Aptitude",
    "Logical Reasoning",
    "General Knowledge",
    "General"
],
        required:true
    }
})

const notesSchema = mongoose.model("note",notes);
module.exports = notesSchema