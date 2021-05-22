var async = require("async");
const WishList = require("../models/wishlist");

function findOne(filter,cb){
    WishList.findOne(filter,function(err,docs){
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