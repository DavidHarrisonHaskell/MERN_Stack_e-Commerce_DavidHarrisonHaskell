const mongoose = require('mongoose');

// This is the schema for the Products collection.
const ProductsSchema = new mongoose.Schema({
    "Title": {
        type: String,
    },
    "Category": {
        type: String, // the ID of the category
    },
    "CategoryID": {
        type: String,
    },
    "Description": {
        type: String,
    },
    "Price": {
        type: Number,
    },
    "Link to pic": {
        type: String,
    }
}, { 
    collection: "Products",
    versionKey: false
});

module.exports = mongoose.model('Products', ProductsSchema); // This exports the Products model.