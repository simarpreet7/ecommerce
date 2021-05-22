var express = require("express");
var router = express.Router();
var productLib = require("../lib/product.lib");
var categoryLib = require("../lib/category.lib");
var middlewares = require("../middlewares/auth");

router.get("/",middlewares.isLoggedIn, function(req,res){
    var name = req.query.search;
    var sort = req.query.sortby;
    var order = req.query.orderby;
    var category = req.query.category;
    let filter = {};
    if(category.length == 4)
        filter = {$or: [{name:{$regex: name, $options: '$i'}}, {category:{$regex: name, $options: '$i'}}]};
    else
        filter = {$or: [{name:{$regex: name, $options: '$i'}}, {category:{$regex: name, $options: '$i'}}], category: category[1]};
    productLib.findbyId(filter, function(err, products){
        if(err)
            console.log(err);
        let cfilter = {};
        categoryLib.findbyId(cfilter, function(err,categories){

            if(sort == "number" && order == "ASC"){
                products.sort(function(a,b){
                    return a.price - b.price;
                })
                res.render("./pages/search", {products: products, categories: categories, name:name});
            }
            else if(sort == "title" && order == "ASC"){
                products.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase(); 
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                res.render("./pages/search", {products: products, categories: categories, name:name});
            }
            else if(sort == "number" && order == "DESC"){
                products.sort(function(a,b){
                    return b.price - a.price;
                })
                res.render("./pages/search", {products: products, categories: categories, name:name});
            }
            else if(sort == "title" && order == "DESC"){
                products.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase(); 
                    if (nameA > nameB) {
                      return -1;
                    }
                    if (nameA < nameB) {
                      return 1;
                    }
                    return 0;
                  });
                res.render("./pages/search", {products: products, categories: categories, name:name});
            }
            else{
                res.render("./pages/search", {products: products, categories: categories, name:name});
            }
        })
    })    
});

module.exports = router;