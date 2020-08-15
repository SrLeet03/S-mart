const express = require('express') ;
const router = express.Router() ;

const {getUserById } = require("../controllers/user") ;
const {getCategoryById , createCategory ,getAllCategory ,getCategory} = require("../controllers/category") ;
//for creating the category user should be signedIn and logedin and only can create this one !
//there order is important !
const {isSignegIn , isAdmin , isAuthenticated} = require("../controllers/auth") ;
//parametrs for routes
router.param("userId",getUserById);
router.param("categoryId" , getCategoryById);

router.post("/category/create/:userId" , isSignegIn , isAuthenticated , isAdmin , createCategory) ; 

router.get("/category/:categoryId" , getCategory) ;
router.get("/categories" , getAllCategory) ;

module.exports = router ;