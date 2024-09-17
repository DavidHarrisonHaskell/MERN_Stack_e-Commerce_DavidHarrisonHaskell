const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    "Category": {
        type: String,
    }
}, { 
    collection: "Categories",
    versionKey: false
});

module.exports = mongoose.model('Categories', CategoriesSchema); // This exports the Categories model.