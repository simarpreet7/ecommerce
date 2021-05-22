var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Order = require("../models/order")

router.get("/signup", function(req, res){
    res.render("./pages/signup");
})
router.post("/signup", function(req, res){
    var category = req.body.category;
    if(category == "User"){
        User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('./pages/signup');
            }
            passport.authenticate("local")(req, res, function(){
                var owner = req.user._id,
                orders = [];
                newuser = {owner, orders}
                Order.create(newuser, function(err, getorder){
                    if(err)
                        console.log(err)
                    getorder.save()
                })
                res.redirect("/dashboard");
            }); 
        });
    }else if(category == "Seller"){
        User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('./pages/signup');
            } 
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard");
            }); 
        });
    }
});

router.get("/login", function(req, res){
    res.render("./pages/login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/auth/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});
module.exports = router;