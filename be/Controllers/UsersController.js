const express = require('express');
const Router = express.Router();
const UsersService = require('../Services/UsersService');
const verifyUser = require('../Middlewares/verifyUser');

// Load environment variables
require('dotenv').config();

// users routes
// user route for getting his own information from the database with route name user_information
Router.get('/user_information', verifyUser, async (req, res) => {
    try {
        const user = await UsersService.getUserInformationService(req.user);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = Router;
