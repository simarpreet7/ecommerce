var async = require("async");
const Product = require("../models/product");

function findbyId(filter,cb){
    Product.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function findOne(filter,cb){
    Product.findOne(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

module.exports={
    findbyId:findbyId,
    findOne:findOne
}