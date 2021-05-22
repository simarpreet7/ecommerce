var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    category:String,
    firstname:{type:String, default:null},
    lastname:{type:String, default:null},
    email:{type:String, default:null},
    phone:{type:String, default:null},
    address:{
        line:{type:String, default:null},
        city:{type:String, default:null},
        country:{type:String, default:null},
        postal:{type:String, default:null}
    },
    cards:[{
        cardno:{type:String, default:null},
        expirymonth:{type:String, default:null},
        expiryyear:{type:String, default:null},
        holdername:{type:String, default:null},
        cvv:{type:String, default:null}
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

