const isAuthorized = (req,res,next)=>{
    let token =  req.headers.cookie;

    if((!token) || (token!=123987)){
     return res.status(401).send("Kon hai bhai tu")
    }
    next()

}


const isLoggedIn = (req,res,next)=>{
    let login= false;

    if(!login){
        return res.status(401).send("Bhai tu phir agaya")
    }
    next()
}

module.exports = {isAuthorized,isLoggedIn}