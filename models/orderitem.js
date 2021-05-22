var mongoose = require('mongoose');

var orderitemSchema = new mongoose.Schema({
    totalPrice: { type: Number, default: 0},
    items: { 
        item: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
        },
        quantity: { type: Number, default: 0},
        price: { type: Number, default: 0},
        image: {type:String, default:null},
        itemname: {type:String, default:null},
        discount:{type: Number, default: 0},
        seller:{      
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }

    },
    payment: {type:String, default:null},
    status: {type:String, default:null},
    orderDate: {type:String, default:null},
    deliveryDate: {type:String, default:null},
    returnDate: {type:String, default:null},
    msg:{type:String, default:null},
    address: {
        line:{type:String, default:null},
        city:{type:String, default:null},
        country:{type:String, default:null},
        postal:{type:String, default:null},
        firstname:{type:String, default:null},
        lastname:{type:String, default:null},
        email:{type:String, default:null},
        phone:{type:String, default:null}
    }
  });
  
  module.exports = mongoose.model('OrderItem', orderitemSchema);