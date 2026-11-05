const express = require("express")
require("dotenv").config()
const morgan = require("morgan")
const db =require("./config/db")
const app = express();
db();
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("combined"))


app.use("/api",noteRoutes)
app.use("/user",userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
