const express = require('express');
const router = express.Router();
LoginService = require('../Services/LoginService');
const jwt = require('jsonwebtoken');

// Load environment variables 
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const Username = req.body.Username;
        const Password = req.body.Password;
        if (!Username || !Password) {
            return res.status(400).json({ error: 'Please enter username and password' });
        }
        const users = await LoginService.getUsersService();
        const user = users.find(user => user.Username === Username && user.Password === Password);
        if (!user) {
            return res.json({ error: 'Invalid username or password' });
        }
        const secretKey = user.admin ? process.env.ADMIN_SECRET_KEY : process.env.USER_SECRET_KEY; // Use different secret keys for admin and user
        const token = jwt.sign({ user }, secretKey);
        return res.json({ sucess: true, token: token, admin: user.admin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    const FirstName = req.body["First Name"];
    const LastName = req.body["Last Name"];
    const Username = req.body.Username;
    const Password = req.body.Password;
    const admin = false // the new user cannot create an admin users
    try {
        if (!FirstName || !LastName || !Username || !Password) { // Check if all fields are entered
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        const body = {
            "First Name": FirstName,
            "Last Name": LastName,
            "Username": Username,
            "Password": Password,
            "admin": admin
        }
        const newUser = await LoginService.addUserService(body); // Call the addUserService function from the LoginService
        // enter logic to create new user
        // save user to database

        return res.status(201).json({ sucess: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Return error message
    }
});

module.exports = router;
