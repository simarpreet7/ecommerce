var express = require("express");
var router = express.Router();
var productLib = require("../lib/product.lib");
var categoryLib = require("../lib/category.lib");
const Category = require("../models/category");

router.get("/", function(req,res){
    let cfilter={};
    categoryLib.findbyId(cfilter, function(err,categories){
        if(err){
            return res.send(err)
        }
        let filter={};
        productLib.findbyId(filter, function(err,products){
            if(err){
                return res.send(err)
            }else{
                res.render("./pages/home",{"categories":categories, "data":products});
            }
        })
    })
    
});

module.exports = router;
