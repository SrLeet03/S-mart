
const Category = require("../models/category") ;
exports.getCategoryById = (req , res , next , id) =>{

    Category.findById(id).exec((err , cate) =>{
        if(err) {
            return res.status(400).json({
                err : "Category not found"
            });
        }
            //if not error then we simply populate 
            //the category by cate
            req.Category = cate ;
            next();
        
    }) ;
};
exports.createCategory = (req , res) =>{
    const category = new Category(req.body) ;
    Category.save((err , category) => {
        if(err) {
            return res.status(400).json({
                err : "Category  not saved in DB !"
            });
        } 
        res.json({category}) ;
    });
};

exports.getCategory = (req , res) =>{
    return res.json(res.category) ;
} ;

exports.getAllCategory = (req , res) =>{
   Category.find().exec((err , categories) =>{
    if(err) {
        return res.status(400).json({
            err : "No Category in DB !"
        });
    } 
    res.json(categories);
   });
};