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

module.exports = router;
