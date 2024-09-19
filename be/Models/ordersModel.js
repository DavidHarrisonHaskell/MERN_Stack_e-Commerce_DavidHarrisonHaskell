const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    "UserID": {
        type: String,
    },
    "User First Name": {
        type: String,
    },
    "ProductID": {
        type: String,
    },
    "Product Title": {
        type: String,
    },
    "Quantity": {
        type: Number,
    },
    "Order Date": {
        type: Date,
    }
}, {
    collection: "Orders",
    versionKey: false
});

module.exports = mongoose.model('Orders', OrdersSchema); // This exports the Orders model.
