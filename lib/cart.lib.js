var async = require("async");
const Cart = require("../models/cart");

function findOne(filter,cb){
    Cart.findOne(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

module.exports={
    findOne:findOne,
}