var express = require("express");
var router = express.Router();
var wishlistLib = require("../lib/wishlist.lib")
var WishList = require("../models/wishlist")
var middlewares = require("../middlewares/auth");

router.get("/", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    wishlistLib.findOne(filter, function(err, list) {
        if(err)
            console.log(err);
        if(list != null){
            res.render("./pages/wishlist", {products: list.items});
        }
        else
            res.render("./pages/wishlist", {products: {}});
    });
});

router.get("/added", middlewares.isLoggedIn, function(req,res){
    res.redirect("/wishlist");
});

router.post("/add/:id",middlewares.isLoggedIn, function(req,res){
    var item = req.body.product_id,
        price = parseInt(req.body.price),
        image = req.body.image;
        itemname = req.body.name;
        discount = req.body.discount;
    var listitem = {item, price, image, itemname, discount};
    var owner = req.user._id;
    var items = [listitem];
    var userlist = {owner, items};

    let filter={owner: req.user._id };
    wishlistLib.findOne(filter, function(err, list) {
        if(list == null){
            WishList.create(userlist, function(err, newlist){
                if(err)
                    console.log(err);
                list = newlist;
                list.save();
            })
        }else{
            var finditem = false;
            for(var i=0;i<list.items.length;i++){
                if(listitem.item == list.items[i].item){
                    finditem = true;
                }
            }
            if(finditem == false){
                list.items.push(listitem);
            }
            list.save();
        }
    });
    res.redirect("/wishlist/added");
});

router.post("/remove/:user_id/:item_id",middlewares.isLoggedIn,function(req,res){
    var item = req.params.item_id;
    let filter={owner: req.params.user_id };
    wishlistLib.findOne(filter, function(err, list) {
        if(err)
            console.log(err);

        for(var i=0;i<list.items.length;i++){
            if(list.items[i].item == item){
                list.items.splice(i,1);
                break;
            }
        }
        list.save();
        res.redirect("/wishlist");
    })
})

module.exports = router;