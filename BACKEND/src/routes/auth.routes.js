const express = require("express"); 
const authController = require ("../controllers/auth.controller");
const authMiddleware = require ("../middlewares/auth.middleware")


// express.Router() is a built-in class in Express used to create modular, mountable route handlers.
const authRouter = express.Router(); // kind of app

// we will only  create API here not logic (controller) 



/**
 * @route POST /api/auth//register
 * @description register a new user 
 * @access public 
 */


authRouter.post("/register", authController.registerUserController) // we will be using a controller here 


/**
 * @route POST /api/auth/login
 * @description login a new user 
 * @ access Public  
 */

authRouter.post("/login" , authController.loginUserController); 

/**
 * @route GET /api/auth/logout 
 * @description clear  token from user cookie and add the token in blacklist model.js
 *  @access PUBLIC 
 */

authRouter.get ("/logout" , authController.logoutUserController)


/**
 * @route  GET /api/auth/get-me
 * @description  get the current logged in user details of the user 
 * @access private 
 */
// a  middleware here 
authRouter.get("/get-me" , authMiddleware.authUser ,  authController.getMeController )
module.exports = authRouter ; 