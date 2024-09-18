const mongoose = require('mongoose');



const BoughtBySchema = new mongoose.Schema({
    "UserID": {
        type: String,
    },
    "Name": {
        type: String,
    },
    "Qty": {
        type: Number,
    },
    "Date": {
        type: Date,
    }
})


const ProductsSchema = new mongoose.Schema({
    "Title": {
        type: String,
    },
    "Category": {
        type: String, // the ID of the category
    },
    "Description": {
        type: String,
    },
    "Price": {
        type: Number,
    },
    "Link to pic": {
        type: String,
    },
    "Bought Buy": {
        type: [BoughtBySchema],
    }
}, { 
    collection: "Products",
    versionKey: false
});

module.exports = mongoose.model('Products', ProductsSchema); // This exports the Products model.