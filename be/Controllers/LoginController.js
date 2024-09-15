const express = require('express');
const router = express.Router();
// const service
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        // post the User Name and Password
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
