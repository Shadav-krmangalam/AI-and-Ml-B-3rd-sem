const {mongoose} = require("mongoose")


async function MONGODBConnection(){
   try{
     await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB Connected")
   }catch(err){
    console.log(err)
   }

}

module.exports = MONGODBConnection;