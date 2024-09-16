const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
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
    }
}, { 
    collection: "Users",
    versionKey: false
});

module.exports = mongoose.model('Users', LoginSchema); // This exports the Login model.