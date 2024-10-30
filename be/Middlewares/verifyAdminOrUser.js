const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdmin = require('./verifyAdmin');
const verifyAdminOrUser = async (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        next();
    } catch (error) {
        try {
            const token = req.headers["token"];
            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }
            const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
            next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Really Unauthorized' });
        }
    }
}

    module.exports = verifyAdminOrUser; // This is a custom middleware function that exports the verifyAdminOrUser function.

