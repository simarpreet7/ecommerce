var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
          },
  totalPrice: { type: Number, default: 0},
  items: [{
    item: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
    },
    quantity: { type: Number, default: 1},
    price: { type: Number, default: 0},
    image: String,
    itemname: String,
    discount:Number,
    seller:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
  }]
});

module.exports = mongoose.model('Cart', CartSchema);
