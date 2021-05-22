var async = require("async");
const orderitem = require("../models/orderitem");

function findbyId(filter,cb){
    orderitem.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function findOne(filter,cb){
    orderitem.findOne(filter,function(err,docs){
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