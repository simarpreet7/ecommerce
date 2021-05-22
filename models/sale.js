var mongoose = require("mongoose");

var saleSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    discount: Number
});

module.exports = mongoose.model("Sale",SaleSchema);