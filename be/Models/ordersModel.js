const mongoose = require('mongoose');

const ProductInformationSchema = new mongoose.Schema({
    "ProductID": {
        type: String,
    },
    "Quantity": {
        type: Number,
    }
}, {
    versionKey: false
});

const OrdersSchema = new mongoose.Schema({
    "UserID": {
        type: String,
    },
    "User First Name": {
        type: String,
    },
    "Orders": {
        type: [ProductInformationSchema],
    },
    "Order Date": {
        type: Date,
    }
}, {
    collection: "Orders",
    versionKey: false
});

module.exports = mongoose.model('Orders', OrdersSchema); // This exports the Orders model.
