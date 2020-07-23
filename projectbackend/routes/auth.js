const express = require('express')
const Router = express.Router();
const {singup , singout} = require("../controllers/auth") ;

Router.post("/singup" , singup) 
Router.get("/singout" , singout) 

module.exports = Router ;