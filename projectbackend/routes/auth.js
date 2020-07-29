const express = require('express')
const Router = express.Router();
const {singup , singout ,singin} = require("../controllers/auth") ;
const {check , validationResult} = require('express-validator');
Router.post("/singup" ,[
check("name").isLength({min:3})
.withMessage('name lemth gtrther than 3'),
check("email").isEmail().withMessage('enter valid email'),
check("password").isLength({min:5}).withMessage('min passward length is 5')
], singup) ;

Router.post("/singin" ,[
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:1}).withMessage('min passward length is 5')
    ], singin) ;

Router.get("/singout" , singout)

module.exports = Router  ;