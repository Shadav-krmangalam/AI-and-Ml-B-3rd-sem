const userSchema = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup =async (req,res)=>{
    let {name,email,course,password,age} = req.body;

    if(!name ||!email||!password||!age){
        return res.status(403).send("Invalid details")
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password,salt)

   let user =  await userSchema.create({name,email,course,password:hashedPassword,age})

  let token = jwt.sign(
    {
        email:user.email
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
    let user = await userSchema.findOne({email});

    if(password!==user.password){
        return res.status(401).send("Unauthorized")
    }

     let token = jwt.sign(
    {
        email:user.email
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
    
}
module.exports = {signup,login};