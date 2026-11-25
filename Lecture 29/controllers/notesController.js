const notesSchema = require("../models/notes")

const getNotes =async (req,res)=>{
  
  try{
    let userId = req.user;
    console.log(userId)
      let notes = await notesSchema.find({user:userId}).sort({ createdAt: -1 }); 

     
     res.status(200).send(notes);

  }catch(err){
    console.log(err,"Sorry notes nhi mil payege aapko")
    res.status(500).send(err)
  }
}

const getNoteById =async(req,res)=>{
  try{
      let {id} = req.params;
     let userId = req.user;

   let note =  await notesSchema.findOne({
       _id:id,
       user:userId
   })
   if(!note){
    return res.status(404).send("Data Not Found")
   }

   res.status(200).send(note)

  }catch(err){
res.status(500).send(err)
  }
}

const createNote =async (req,res)=>{
  try{
   
      let {title,description,referenceLink,authorName,notes,category} = req.body
      let userId = req.user;


    if(!title||!notes||!userId||!category){
        return res.status(400).send("required Credentials are needed")
    }

   await notesSchema.create({title,description,referenceLink,authorName,notes,user:userId,category})
    res.status(201).send("Note Added Successfully")
  }catch(err){
    res.status(500).send(err)
  }
}


const updateNote =async (req,res)=>{
try{
        let {id} = req.params;
    let userId=req.user;
     let {title,description,referenceLink,file,authorName,notes,category} = req.body

    let note = await notesSchema.findOneAndUpdate({_id:id,user:userId},{$set:{title,description,referenceLink,file,authorName,notes,category}},{new:true,runValidators:true})
    


if (!note) {
    return res.status(404).send("Note not found");
}

res.status(200).json({
    message: "Note Updated Successfully",
    note
});
}catch(err){
    res.status(500).send(err)
}
}

const deleteNote =async (req,res)=>{
try{
        let {id} = req.params;
    let userId = req.user
    let note = await notesSchema.findOneAndDelete({_id:id,user:userId})
   
if (!note) {
    return res.status(404).send("Note not found");
}

    res.status(200).send("Note has been Deleted successfully")


}catch(err){
    res.status(500).send(err)
}
}
module.exports = {getNotes,getNoteById,createNote,updateNote,deleteNote}