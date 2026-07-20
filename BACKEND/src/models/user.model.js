const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        unique : [true , "username already taken"], //  here we can pass error message also 
        required : true ,
    },
     email: {
        type : String ,
        unique : [true , "Account already exists with this email"],
        required : true ,
    },
    password : {
        type : String ,
        required : true , 
    } 
})


const userModel = mongoose.model("users" , userSchema); 
// it is method mongoose.model set to users means we define collection here schema is userSchema


module.exports = userModel ;