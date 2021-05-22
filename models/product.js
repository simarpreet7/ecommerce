var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    price: Number,
    stock: Number,
    description: String,
    category: String,
    discount: Number,
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model("Product",productSchema);