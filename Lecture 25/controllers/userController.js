const userSchema = require("../models/user");

const signup =async (req,res)=>{
    let {name,email,password,age} = req.body;

    if(!name ||!email||!password||!age){
        return res.status(403).send("Invalid details")
    }
   let user =  await userSchema.create({name,email,password,age})

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
    res.status(200).json({
        "message":"Login Successfully",
        data:user
    })}

module.exports = {signup,login};