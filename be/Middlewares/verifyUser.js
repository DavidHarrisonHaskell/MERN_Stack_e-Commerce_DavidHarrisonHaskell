const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = verifyUser;