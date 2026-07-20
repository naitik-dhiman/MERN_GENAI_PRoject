const jwt = require("jsonwebtoken");
const tokenBlacklistModel  = require("../models/blacklist.model")


 async function authUser (req, res , next )
{
    const token = req.cookies.token ; 
    //  if token is not there then there is  no user exit from here 

    if (!token ){
        return res.status(401).json({
            message : "token not provided " ,
        })
    }
    // if token is there we have to check is it blacklisted or not 
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token 
    })
     
    if (isTokenBlacklisted){
        return res.status(400).json({
            message : "token is invalid "
        })
    }

    // if token is there we can extract data from there  , we use try and catch here is token is wrong and it is expired 
    try {
         const decoded = jwt.verify(token , process.env.JWT_SECRET); 
        

         // jo bhi user ka data hai send set into req.user and pass the request to next 
         req.user = decoded ;

         next() ; 
    }catch (err){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
    
}



// we generally export as a empty  object and middleware as a function 
module.exports = { authUser }; 