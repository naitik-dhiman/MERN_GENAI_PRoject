const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const tokenBlacklistModel = require("../models/blacklist.model")


/**
 * @access name  registerUserController 
 * @description register a new user , expects a username , password , email 
 * @access Public   
 */
async function registerUserController(req , res){
    const { username , email , password } = req.body ;

    if (!username || !email || ! password ) {
        return res.status(400).json({
            message : "Please provide email , username ,  or password "
        })
    }

    //now we have to  check does  a user exists before with same email password and username 

    // checking using mongodb functionality 
    const isUserAlreadyExists = await userModel.findOne({
        // this demands an array with  multiple conditions 
        // if any of the condition is true it will return user   
        $or: [{ username } , { email  }]
    })


    if(isUserAlreadyExists){
        isUserAlreadyExists.username === username; 
        isUserAlreadyExists.email === email; 
        return res.status(400).json({
            message : ` Account already exists with this ${isUserAlreadyExists.username} or ${ isUserAlreadyExists.email}`
        })
    }


    // if user not exists , we create a new user not  by just directly but by hashing the password first 

    // we require three packages here bcryptjs,  jsonwebtoken  , cookie-parser 
    // bcryptjs  -> hashing pass 
    // jsonwebtoken -> to create jwt token  
    // cookie-parser to set token into cookie , to read token from cookie 

    // hashing 
    const hash = await bcrypt.hash (password , 10 );


    // creating a new user with help of mongodb functionality 
    const user = await userModel.create({
        username , 
        email , 
        password : hash 
    })

    // generate a jwt secret using website  done 


    //  creating a token here for sign in that this person belongs to us 
    //  digital identity card 
    const token = jwt.sign(
        { id: user._id, username: user.username }, // payload -> data you want to store in token 
           // Think of it as a secret password only your server knows.
          // Example
         // "MyVerySecretKey12345"
        // Nobody except your backend knows this.
       // Why?
      // Because anyone could otherwise create fake tokens.
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
        // After that
        // User has to login again.
    )

    // store token in cookie , cookie is a small piece of data stored by the browser 
    res.cookie("token" , token ) 

    res.status(201).json({
        message : "User registered successfully ",
        user : {
            id : user._id ,
            username : user.username ,
            email : user.email , 
        }
    })

    // <----------------------flow----------------------------->
//     Login

// ↓

// Server verifies password

// ↓

// JWT created

// ↓

// JWT stored inside cookie

// ↓

// Browser saves cookie

// ↓

// Every request automatically sends cookie

// ↓

// Server checks token

// ↓

// User stays logged in
}

/**
 * @name loginUserController 
 * @description login a user , expects email and passwords in request.body 
 * @access Public 
 */

async function loginUserController (req, res) {
    const {email , password } = req.body ;
    

    // finding a user through mongodb functionality 
    const user = await userModel.findOne({email});


    // if the user is not being matched 
    if (!user){
     return res.status(400).json({
        message : "invalid email or Password", 
     })
    }
    

    //checking is password valid through the bcrypt functionality 
    /// i.e  comparing the user password and actual password 
    const isPasswordValid =  await  bcrypt.compare(password , user.password ) ;

    // if not a valid password 
    if (!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email  or password "
        })
    }

    //  if password is valid we create token again 

    const token = jwt.sign(
        { id: user._id, username: user.username }, // payload -> data you want to store in token 
           // Think of it as a secret password only your server knows.
          // Example
         // "MyVerySecretKey12345"
        // Nobody except your backend knows this.
       // Why?
      // Because anyone could otherwise create fake tokens.
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
        // After that
        // User has to login again.
    )

    // store token in cookie , cookie is a small piece of data stored by the browser 
    res.cookie("token" , token );

    res.status(200).json({
        message : "User logged in successfully ",
        user : {
          id : user._id ,
          username : user.username ,
          email : user.email ,
        }
    })
}

/**
 * @name logoutUserController 
 * @description clear token from cookie and add the tokenn in blacklist 
 *  @access public 
 */
async function logoutUserController(req , res){
    const token = req.cookies.token ; // extracting token from user side 
    

    // if token is there add it into blacklist  , here we will be requiring a model that we have created 
    if (token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token");

   res.status(200).json({
    message : "User logged out successfully "
   })
}

/**
 * @name getMeController 
 * @description get the current logged in user details , expects the token in the request from  middleware 
 * @access private 
 */
async function getMeController (req ,res){
    // all data comes form req,user from middleware that we have created it comes from decoded  
    const user = await userModel.findById(req.user.id)  //req.user we have and we have id in that also 


    res.status(200).json({
        message : "user details fetched successfully ", 
        user : {
            id : user._id ,
            username : user.username ,
            email : user.email ,
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController, 
};