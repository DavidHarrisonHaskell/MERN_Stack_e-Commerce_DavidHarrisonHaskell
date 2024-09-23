const express = require('express');
const Router = express.Router();
UsersService = require('../Services/usersService');
const jwt = require('jsonwebtoken');

// Load environment variables 
require('dotenv').config();

Router.post('/login', async (req, res) => {
    try {
        const Username = req.body.Username;
        const Password = req.body.Password;
        if (!Username || !Password) {
            return res.status(400).json({ success: false, error: 'Please enter username and password' });
        }
        const users = await UsersService.getUsersService();
        const user = users.find(user => user.Username === Username && user.Password === Password);
        if (!user) {
            return res.json({ error: 'Invalid username or password' });
        }
        const secretKey = user.admin ? process.env.ADMIN_SECRET_KEY : process.env.USER_SECRET_KEY; // Use different secret keys for admin and user
        const token = jwt.sign({ user }, secretKey);
        return res.json({ success: true, token: token, admin: user.admin });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

Router.post('/register', async (req, res) => {
    const FirstName = req.body["First Name"];
    const LastName = req.body["Last Name"];
    const Username = req.body.Username;
    const Password = req.body.Password;
    const admin = false // the new user cannot create an admin users
    const allowOthersToSeeMyOrders = req.body.allowOthersToSeeMyOrders;
    try {
        if (!FirstName || !LastName || !Username || !Password || !allowOthersToSeeMyOrders) { // Check if all fields are entered
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        const body = {
            "First Name": FirstName,
            "Last Name": LastName,
            "Username": Username,
            "Password": Password,
            "admin": admin,
            "Registration Date": new Date(),
            "allowOthersToSeeMyOrders": allowOthersToSeeMyOrders
        }
        const newUser = await UsersService.addUserService(body); // Call the addUserService function from the UsersService
        // enter logic to create new user
        // save user to database

        return res.status(201).json({ sucess: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Return error message
    }
});

module.exports = Router;
