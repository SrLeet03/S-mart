const User = require('../models/user')

exports.singup = (req , res ) =>{
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
exports.singout = (req , res ) =>{
    res.json({
           message:"hey you are onn singout page !"
    });
};
