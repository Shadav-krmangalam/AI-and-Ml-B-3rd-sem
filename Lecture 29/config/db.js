const {mongoose} = require("mongoose")

async function MONGODBConnection(){
   try{
     await mongoose.connect("mongodb://localhost:27017/AiMl")
    console.log("MongoDB Connected")
   }catch(err){
    console.log(err)
   }

}

module.exports = MONGODBConnection;