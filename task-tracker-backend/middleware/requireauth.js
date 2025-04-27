const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../models/user');

const requireAuth = async (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);

        // Find the user associated with the token's ID
        const user = await User.findById(decoded.userId).select('-password'); // Exclude the password from the user object

        if (!user) {
            return res.status(401).json({ message: 'Authentication required - Invalid user' });
        }

        // Attach the user object to the request for use in subsequent route handlers
        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Authentication required - Invalid token' });
    }
};

module.exports = requireAuth;