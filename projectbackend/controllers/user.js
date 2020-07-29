
const User = require("../models/user");

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
