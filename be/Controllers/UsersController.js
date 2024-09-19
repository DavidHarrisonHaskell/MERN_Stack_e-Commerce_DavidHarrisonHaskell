const express = require('express');
const Router = express.Router();
const UsersService = require('../Services/usersService');
const verifyUser = require('../Middlewares/verifyUser');

// Load environment variables
require('dotenv').config();

// users routes

// user route for getting his own information from the database with the route name as his id
Router.get('/:id', verifyUser, async (req, res) => {
    try {
        const user = await UsersService.getUserInformationService(req.params.id);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// user route for updating his own information in the database with route name as his id
Router.put('/:id', verifyUser, async (req, res) => {
    const id = req.params.id;
    try {
        if (req.body["First Name"] === "" || req.body["Last Name"] === "" || req.body.Username === "" || req.body.Password === "") {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        const body = {
            "First Name": req.body["First Name"],
            "Last Name": req.body["Last Name"],
            "Username": req.body.Username,
            "Password": req.body.Password,
        };
        const updatedUser = await UsersService.updateUserService(id, body);
        return res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// user route for getting all of his orders from the database
Router.get('/:id/orders', verifyUser, async (req, res) => {
    try {
        const userOrders = await UsersService.getUserOrdersService(req.params.id);
        return res.json(userOrders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = Router;
