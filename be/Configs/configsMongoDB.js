const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MERN_e-Commerce").then(() => console.log("Connected to MongoDB")).catch(err => console.log("Could not connect to MongoDB", err));
