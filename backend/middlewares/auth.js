const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

const checkForAuthentication = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.MY_JWT_SECRET);
        const user = await User.findById(decoded.userId);
        req.user = user; // Attach user info to request object
        next(); 
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: "Forbidden access" });
    }
}

const checkForAdmin= (req, res, next) => {
    
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next(); // Proceed to the next middleware or route handler
}

module.exports = {
    checkForAuthentication,
    checkForAdmin
};
