var express = require("express");
var router = express.Router();
var middlewares = require("../middlewares/auth");
var Cart = require("../models/cart")
var cartLib = require("../lib/cart.lib");

router.get("/shopping-cart", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);
        if(cart != null){
            res.render("./pages/cart", {products: cart.items, totalPrice: cart.totalPrice});
        }
        else
            res.render("./pages/cart", {products: {}, totalPrice: null});
    });
});

router.get("/",middlewares.isLoggedIn, function(req,res){
    res.redirect("/cart/shopping-cart");
})

router.post("/add/:id",middlewares.isLoggedIn, function(req,res){
    var item = req.body.product_id,
        price = parseInt(req.body.price),
        quantity = parseInt(req.body.quantity);
        image = req.body.image;
        itemname = req.body.name;
        discount = req.body.discount;
        seller = req.body.seller;
        no = 0;
    var cartitem = {item, price, quantity, image, itemname, discount, seller};
    var owner = req.user._id;
    var totalPrice = 0;
    var items = [cartitem];
    var usercart = {owner, totalPrice, items};

    let filter={owner: req.user._id };
    cartLib.findOne(filter, function(err, cart) {
        if(cart == null){
            Cart.create(usercart, function(err, newcart){
                if(err)
                    console.log(err);
                for(var i=0;i<newcart.items.length;i++)
                    newcart.totalPrice = newcart.totalPrice + newcart.items[i].price;
                cart = newcart;
                cart.save();
                no = cart.items.length;
            })
        }else{
            var finditem = false;
            for(var i=0;i<cart.items.length;i++){
                if(cartitem.item == cart.items[i].item){
                    cart.items[i].quantity = cart.items[i].quantity + cartitem.quantity;
                    cart.items[i].price = cart.items[i].price + cartitem.price;
                    cart.totalPrice = cart.totalPrice + cartitem.price; 
                    finditem = true;
                }
            }
            if(finditem == false){
                cart.items.push(cartitem);
                cart.totalPrice = cart.totalPrice + cartitem.price; 
            }
            cart.save();
            no = cart.items.length;
        }
        res.redirect("/cart");
    });
});


router.post("/shopping-cart/remove/:user_id/:item_id",middlewares.isLoggedIn,function(req,res){
    var item = req.params.item_id;
    let filter={owner: req.params.user_id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);

        for(var i=0;i<cart.items.length;i++){
            if(cart.items[i].item == item){
                cart.totalPrice = cart.totalPrice - cart.items[i].price;
                cart.items.splice(i,1);
                break;
            }
        }
        cart.save();
        res.redirect("/cart/shopping-cart");
    })
})

router.post("/shopping-cart/minus/:user_id/:item_id",middlewares.isLoggedIn,function(req,res){
    var item = req.params.item_id;
    let filter={owner: req.params.user_id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);

        for(var i=0;i<cart.items.length;i++){
            if(cart.items[i].item == item){
                cart.totalPrice = cart.totalPrice - (cart.items[i].price / cart.items[i].quantity);
                cart.items[i].price = cart.items[i].price - (cart.items[i].price / cart.items[i].quantity);
                cart.items[i].quantity = cart.items[i].quantity - 1;
                if(cart.items[i].quantity == 0)
                    cart.items.splice(i,1);
                break;
            }
        }
        cart.save();
        res.redirect("/cart/shopping-cart");
    })
})

router.post("/shopping-cart/plus/:user_id/:item_id",middlewares.isLoggedIn,function(req,res){
    var item = req.params.item_id;
    let filter={owner: req.params.user_id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);

        for(var i=0;i<cart.items.length;i++){
            if(cart.items[i].item == item){
                cart.totalPrice = cart.totalPrice + (cart.items[i].price / cart.items[i].quantity);
                cart.items[i].price = cart.items[i].price + (cart.items[i].price / cart.items[i].quantity);
                cart.items[i].quantity = cart.items[i].quantity + 1;
                break;
            }
        }
        cart.save();
        res.redirect("/cart/shopping-cart");
    })
})

module.exports = router;