const express = require('express')
const Router = express.Router();
const {signup , signout ,signin , isSignedin} = require("../controllers/auth") ;
const {check , validationResult} = require('express-validator');
Router.post("/signup" ,[
check("name").isLength({min:3})
.withMessage('name lemth should gtrther than 2'),
check("email").isEmail().withMessage('enter valid email'),
check("password").isLength({min:5}).withMessage('min passward length is 5')
], signup) ;

Router.post("/signin" ,[
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:1}).withMessage('min passward length is 5')
    ], 
signin) ;

Router.get("/signout" , signout) ;

module.exports = Router  ;