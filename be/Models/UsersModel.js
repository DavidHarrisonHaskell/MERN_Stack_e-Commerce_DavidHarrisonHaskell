const mongoose = require('mongoose');

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
    "allowOthersToSeeMyOrders": {
        type: Boolean,
    }
}, { 
    collection: "Users",
    versionKey: false
});

module.exports = mongoose.model('Users', UsersSchema); // This exports the Login model.