var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
    },
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OrderItem'
    }],
});

module.exports = mongoose.model('Order', orderSchema);