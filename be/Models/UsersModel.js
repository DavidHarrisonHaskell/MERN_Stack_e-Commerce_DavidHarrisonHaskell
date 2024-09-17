const mongoose = require('mongoose');

const ProductsBoughtSchema = new mongoose.Schema({
    "ProductID": {
        type: String,
    },
    "ProductName": {
        type: String,
    },
    "Qty": {
        type: Number,
    },
    "Date": {
        type: Date,
    }
})

const UsersSchema = new mongoose.Schema({
    "First Name": {
        type: String,
    },
    "Last Name": {
        type: String,
    },
    "Username" : {
        type: String,
    },
    "Password" : {
        type: String,
    },
    "admin" : {
        type: Boolean,
    },
    "Registration Date": {
        type: Date,
    },
    "Products Bought": {
        type: [ProductsBoughtSchema],
    }
}, { 
    collection: "Users",
    versionKey: false
});

module.exports = mongoose.model('Users', UsersSchema); // This exports the Login model.