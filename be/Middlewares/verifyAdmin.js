const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = verifyAdmin; // This is a custom middleware function that exports the verifyAdmin function.