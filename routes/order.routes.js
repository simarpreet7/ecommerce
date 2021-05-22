var express = require("express");
var router = express.Router();
var orderLib = require("../lib/order.lib")
var OrderItem = require("../models/orderitem")
var orderitemLib = require("../lib/orderitem.lib")
var cartLib = require("../lib/cart.lib");
var middlewares = require("../middlewares/auth");
var productLib = require("../lib/product.lib");

router.get("/", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        let orders = [];
        if(ordersplaced != null){
            ordersplaced.orders.forEach(function(id){
                let ofilter = {_id: id}
                orderitemLib.findOne(ofilter, function(err, foundorder){
                    orders.push(foundorder);
                })
                
            })
            function myFunction() {
                setTimeout(orderFunc, 1000);
            }
            
            function orderFunc() {
                res.render("./pages/order", {orders: orders});
            }
            myFunction(); 

        }else if(ordersplaced == null){
            res.render("./pages/order", {orders: []}); 
        }
    });
});

router.get("/payment", middlewares.isLoggedIn, function(req,res){
    res.render("./pages/payment");
});

router.get("/done", middlewares.isLoggedIn, function(req,res){
    res.redirect("/order")
});

router.post("/checkout", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);
            orderLib.findOne(filter, function(err, ordersplaced) {
                if(err)
                    console.log(err)
                cart.items.forEach(function(item){
                    let pfilter = {_id: item.item}

                    productLib.findOne(pfilter, function(err, product){
                        product.stock = product.stock - item.quantity;
                        product.save();
                    })
                    var totalPrice = item.price,
                        items = item,
                        payment = "Cash On Delivery",
                        status = "Waiting for Confirmation",
                        tempOrderDate = new Date(),
                        orderDate = tempOrderDate.toLocaleDateString(),
                        tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000),
                        deliveryDate = tempdeliveryDate.toLocaleDateString(),
                        tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000),
                        returnDate = tempreturnDate.toLocaleDateString(),
                        msg = null,
                        line = req.user.address.line,
                        city = req.user.address.city,
                        country = req.user.address.country,
                        postal = req.user.address.postal,
                        firstname = req.user.firstname,
                        lastname = req.user.lastname,
                        email = req.user.email,
                        phone = req.user.phone,
                        address = {line, city, country, postal, firstname, lastname, email, phone},
                        order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};
                    var id;
                    OrderItem.create(order, function(err, neworder){
                        if(err)
                            console.log(err);
                        id = neworder._id;
                        ordersplaced.orders.push(id);
                    })
                })
                function myFunction() {
                    setTimeout(orderFunc, 1000);
                }
                
                function orderFunc() {
                    ordersplaced.save(); 
                }
                myFunction(); 
                cart.items = [];
                cart.totalPrice = 0;
                cart.save();
                res.redirect("/order/payment");
        })
    });
});


router.get("/viewdetails/:order_id",middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id};
    orderitemLib.findOne(filter, function(err, foundorder) {
        if(err)
            console.log(err);
        res.render("./pages/viewdetails",{order:foundorder});
    });
})

router.get("/cancel/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id};
    orderitemLib.findOne(filter, function(err, foundorder) {
        if(err)
            console.log(err);
        res.render("./pages/cancelorder",{order:foundorder});
    });
});

router.post("/cancel/:order_id", middlewares.isLoggedIn, function(req,res){
    var msg = req.body.cancelreason;
    let filter={_id: req.params.order_id};
    orderitemLib.findOne(filter, function(err, foundorder) {
        if(err)
            console.log(err);
        foundorder.status = "Cancelled";
        foundorder.deliveryDate = new Date().toLocaleDateString();
        foundorder.msg = msg;
        foundorder.save(); 
    });
    res.redirect("/order/done");
});

router.get("/buyagain/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        let ofilter={_id: req.params.order_id};
        orderitemLib.findOne(ofilter, function(err, foundorder) {
            if(err)
                console.log(err);
            var totalPrice = foundorder.totalPrice,
                items = foundorder.items,
                payment = "Cash On Delivery",
                status = "Waiting for confirmation",
                tempOrderDate = new Date(),
                orderDate = tempOrderDate.toLocaleDateString(),
                tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000),
                deliveryDate = tempdeliveryDate.toLocaleDateString(),
                tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000),
                returnDate = tempreturnDate.toLocaleDateString(),
                msg = null,
                address = foundorder.address,
                order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};
                var id;
                OrderItem.create(order, function(err, neworder){
                    if(err)
                        console.log(err);
                    id = neworder._id;
                    ordersplaced.orders.push(id);
                    ordersplaced.save(); 
                }) 
            res.redirect("/order/done");
        });
    })
});

router.get("/return/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id};
    orderitemLib.findOne(filter, function(err, foundorder) {
        if(err)
            console.log(err);
        res.render("./pages/returnorder",{order:foundorder});
    });
});

router.post("/return/:order_id", middlewares.isLoggedIn, function(req,res){
    var msg = req.body.cancelreason;
    let filter={_id: req.params.order_id};
    orderitemLib.findOne(filter, function(err, foundorder) {
        if(err)
            console.log(err);
        foundorder.status = "Returned";
        foundorder.deliveryDate = new Date().toLocaleDateString();
        foundorder.msg = msg;    
        foundorder.save(); 
    });
    res.redirect("/order/done");
});


module.exports = router;
