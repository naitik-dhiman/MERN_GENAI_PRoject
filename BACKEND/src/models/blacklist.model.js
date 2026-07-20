const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema ({
    token : {
        type : String ,
        required :[true , "token is required to be added in blacklist"] // passing message in this way   
    }
}, {
    timestamps : true , // manages when token is  blacklisted all these things 
})


const tokenBlacklistModel = mongoose.model("blacklistTokens" , blacklistTokenSchema ); 


module.exports =  tokenBlacklistModel  ;



// User logs in
//       │
//       ▼
// Server creates JWT
//       │
//       ▼
// Server stores JWT in cookie
//       │
//       ▼
// Browser saves cookie
//       │
//       ▼
// User clicks Logout
//       │
//       ▼
// Browser sends POST /logout
// +
// Automatically sends cookie
//       │
//       ▼
// req.cookies.token
//       │
//       ▼
// Add token to blacklist
//       │
//       ▼
// Delete cookie
//       │
//       ▼
// Send success response