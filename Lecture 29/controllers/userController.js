const userSchema = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const event = require("../events/eventEmitters")

const signup =async (req,res)=>{
    event.emit("apicount")
    let {name,email,password} = req.body;

    if(!name ||!email||!password){
        return res.status(403).send("Invalid details")
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password,salt)

   let user =  await userSchema.create({name,email,password:hashedPassword})

  let token = jwt.sign(
    {
        user:user._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn:"1h"
    }
   )
   res.cookie("token",token)

   res.status(201).json({
    "message":"User Created Successfully",
    data:user
   })

}

const login = async(req,res)=>{
    let {email,password} = req.body;

    if(!email || !password){
        return res.status(403).send("Invalid Credentials")
    }
    let user = await userSchema.findOne({email})
    
    if(!email){
        return res.status(404).send("Not found")
    }

    let isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send("Unauthorized")
    }

     let token = jwt.sign(
    {
        user:user._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn:"1h"
    }
   )
   res.cookie("token",token)

    res.status(200).json({
        "message":"Login Successfully",
        data:user
    })}


const dummy = async(req,res)=>{
    let token = req.cookies.token

    if(!token){
        return res.status(401).send("Unauthorized")
    }
    let data = jwt.verify(token,process.env.SECRET_KEY)
    console.log(data)
    res.status(200).send("Access granted")
}
module.exports = {signup,login,dummy};