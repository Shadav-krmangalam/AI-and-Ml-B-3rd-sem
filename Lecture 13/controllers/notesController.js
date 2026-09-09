const { notes } = require("../models/data")

const getNotes = (req,res)=>{
    res.status(200).send(notes)
}

const getNoteById =(req,res)=>{
    let {id} = req.params;

   let element =  notes.find(note=> note.id === Number(id))
   if(!element){
    return res.status(404).send("Data Not Found")
   }

   res.status(200).send(element)
}

const createNote = (req,res)=>{
    let {title,description,link,author,createdOn,note} = req.body

    let newData = {
        id:notes.length +1,
        title:title,
        description:description,
        note:note,
        link:link,
        author:author,
        createdOn:createdOn

    }

    notes.push(newData);
    res.status(201).send("Note Added Successfully")
}


const updateNote = (req,res)=>{
    let {id} = req.params;

    const note = notes.find(note => note.id === Number(id))

    if(!note) {
        return res.status(404).send("Data Not Found")
    }

    Object.assign(note,req.body)
    res.status(200).send("Note Updated")
}

const deleteNote = (req,res)=>{
    let {id} = req.params;
    const note = notes.find(note=> note.id === Number(id))

    if(!note){
        return res.status(404).send("Data not found")
    }

    let index =  notes.indexOf(note)
    notes.splice(index,1)

    res.status(200).send("Dekho woh chala gaya")


}
module.exports = {getNotes,getNoteById,createNote,updateNote,deleteNote}