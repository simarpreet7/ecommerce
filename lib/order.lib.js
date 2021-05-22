var async = require("async");
const Order = require("../models/order");

function findbyId(filter,cb){
    Order.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function findOne(filter,cb){
    Order.findOne(filter,function(err,docs){
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
    findOne:findOne,
}