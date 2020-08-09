
const User = require("../models/user");
const Order = require("../models/order");
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
   // req.profile = user;
   req.profile = user ;
    next();
  });
};

exports.getUser = (req, res) => {
    //hides folllowing info from getting disclose
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req , res) =>{
    User.findByIdAndUpdate(
        {_id :req.profile._id},
        {$set:req.body}, //this tells which field has to modifies
        {new:true , useFindAndModify:false},
        (err , user)=>{
            if(err || !user){
               return res.status(400).json({
                    error:"You are not auth to make changes"
                });
            };
            user.salt = undefined;
            user.encry_password = undefined;
         res.json(user);
        }
        )
} ;

exports.userPurchaseList = (req,res) =>{
  Order.find({user:req.profile._id})
  .populate("user"/*the model we want to update*/ , "_id name"/*the fields for update with space*/)
  .exec((err , Order) => {
           if(err){
             return res.status(400).json({
               error:"No order in this account"
             })
           }
           return res.json(order)
  })
} ;
//this is just for the update of users purchase list
exports.pushOrderInPurchaseList =  (req , res , next) =>{
  let purchases = []
  req.body.order.products.array.forEach(product => { //traversing the loop
    purchases.push({
      _id:product._id ,
      name:product.name,
      description : product.description ,
      quantity: product.quantity,
      amount:product.amount,
      category:product.category,
      transaction_id:product.transaction_id
    });
  });

//connection of above with the database !

User.findOneAndUpdate(
  {_id:req.profile._id},
  {$push :{purchases:purchases}}, //what we want to update ..not set cauz this is an array
  {next:true} , //every time return updated obj
  (err , purchase) =>{
    if(err){
      return res.status(400).json({
        error:"Unable to save purchase list"
      }) ;
    }
      next();

    }

);

};

