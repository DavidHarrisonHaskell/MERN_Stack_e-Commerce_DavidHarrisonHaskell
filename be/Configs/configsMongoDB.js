const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MERN_e-Commerce_DB_DavidHarrisonHaskell").then(() => console.log("Connected to MongoDB")).catch((err) => console.log("Error connecting to MongoDB", err));