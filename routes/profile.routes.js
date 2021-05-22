var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var userlib = require("../lib/user.lib")
var middlewares = require("../middlewares/auth");

router.get("/", middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.user._id}
    userlib.findbyId(filter, function(err, user){
        if(err)
            console.log(err)
        res.render("./pages/profile", {users: user});
    })
});

router.post("/update", middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.user._id}
    var firstname = req.body.firstname;
        lastname = req.body.lastname;
        email = req.body.email;
        phone = req.body.phone;
        line = req.body.line;
        city = req.body.city;
        country = req.body.country;
        postal = req.body.postal;
    var address = {line, city, country, postal}
    userlib.findOne(filter, function(err, user){
        if(err)
            console.log(err)
        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.email = email;
        user.address = address;
        user.save();
        if(req.user.category == "User")
            res.redirect("/profile")
        else
            res.redirect("/dashboard")
    })
});

router.get("/addcard", middlewares.isLoggedIn, function(req,res){
        res.render("./pages/addcard");
});

router.post("/addcard", middlewares.isLoggedIn, function(req,res){
    var cardno = req.body.cardnumber,
        name = req.body.cardname,
        expmonth = req.body.expiresmonth,
        expyear = req.body.expiresyear,
        cvv = req.body.cardcvv
    var newcard = {cardno, name, expmonth, expyear, cvv};
    let filter = {_id: req.user._id};
    userlib.findOne(filter, function(err, user){
        if(err)
            console.log(err)
        user.cards.push(newcard);
        user.save();
        res.redirect("/profile");
    })
});

router.get("/deletecard/:card_id", middlewares.isLoggedIn, function(req,res){
    var id = req.params.card_id;
    let filter = {_id: req.user._id};
    userlib.findOne(filter, function(err, user){
        if(err)
            console.log(err)
        for(var i=0;i<user.cards.length;i++){
            if(user.cards[i]._id == id)
                user.cards.splice(i, 1);
        }
        user.save();
        res.redirect("/profile");
    })
});

module.exports = router;