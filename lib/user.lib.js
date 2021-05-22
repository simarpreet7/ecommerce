var async = require("async");
const User = require("../models/user");

function findbyId(filter,cb){
    User.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function findOne(filter,cb){
    User.findOne(filter,function(err,docs){
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