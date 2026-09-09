const express = require("express")

const app = express();
app.use(express.json())

// app.get("/",(req,res)=>{
//    return res.status(200).send("hello world")
// })

let students = ["Alex","Joy","Sara"]

//CRUD Operation


//READ
app.get("/student",(req,res)=>{
    res.status(200).send(students)
})


//CREATE

app.post("/student",(req,res)=>{
   
     let data = req.body.name
     students.push(data)
     res.status(200).send("Student Added Successfully")
})

//UPDATE
app.put("/student/:index",(req,res)=>{
  let ind = req.params.index
  let data = req.body.name

  students[ind] = data
  res.status(200).send("Student Updated Successfully")

})

app.delete("/student/:index",(req,res)=>{
    let ind = req.params.index
    students.splice(ind,1)
    res.status(200).send("Deleted")
})

app.listen(3000,()=>{
    console.log("Server is running on Port : 3000")
})