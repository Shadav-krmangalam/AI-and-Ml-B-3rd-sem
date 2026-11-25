const jwt = require("jsonwebtoken")
const isAuthorized = (req,res,next)=>{
    let token =  req.headers.cookie;

    if((!token) || (token!=123987)){
     return res.status(401).send("Kon hai bhai tu")
    }
    next()

}


const isLoggedIn =async (req,res,next)=>{
   let token = req.cookies.token;

   if(!token){
    return res.status(401).send("Unauthorized")
   }
  let data = await jwt.verify(token,process.env.SECRET_KEY)

 
 req.user =data.user
  next()

}

module.exports = {isAuthorized,isLoggedIn}