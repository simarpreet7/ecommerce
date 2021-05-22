var async = require("async");
const Category = require("../models/category");

function findbyId(filter,cb){
    Category.find(filter,function(err,docs){
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
}