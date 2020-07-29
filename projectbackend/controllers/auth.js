const User = require('../models/user')
const {check , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');

exports.singup = (req , res ) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
           error : errors.array()[0].msg
        });
    }
   const user  = new User (req.body) ;
   user.save((err , user/* this can be anything*/) =>{
       if(err){
           return res.status(400).json({
               err : "Not able to save user in DB"
           })
       }
       res.json(
        {
            name: user.name,
            email: user.email,
            id: user._id
          }
       );
   });
};
exports.singin = (req , res) =>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
           error : errors.array()[0].msg
        });
    }
    User.findOne({email} , (err,user)=>{
        if(err){
            res.status(400).json({
                error:"User email does not exit"
            })
        }
        if(user.autheticate(password)){
          return res.status(401).json({
              error:"Email and password does not match"
          })
        }
        // CREATING OF token
        const token = jwt.sing({_id :user._id} , process.env.SECRET)
        //putting the toekn in web cokkie
        res.cookie("token" , {expire:new Date()+99});

        //send response to front end
        const {_id  , name , email , role} = user ;
        return res.json({token , user:{_id , name , email , role}})
    })
};
exports.singout = (req , res ) =>{
    res.json({
           message:"hey you are onn singout page !"
    });
};
