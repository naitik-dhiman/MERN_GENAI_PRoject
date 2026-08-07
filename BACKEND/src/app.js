const express = require("express");
const cookieParser =  require("cookie-parser"); 
const cors = require("cors");


const app = express (); 


app.use(express.json()) // middleware that allows data in req.body 
// require all the  routes here 
app.use(cookieParser());
//using cors
app.use(cors ({
    origin : "http://localhost:5173",
    credentials : true , 
}))
//imports all auth routes 
const authRouter = require("./routes/auth.routes")

// It tells Express: "Hey, whenever a request comes in that starts with the URL /api/auth, hand it over completely to the authRouter to handle the rest."
app.use("/api/auth" , authRouter);

module.exports = app ; 