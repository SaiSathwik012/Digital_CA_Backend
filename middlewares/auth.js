const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const caRole = (req, res, next) => {
    if (req.user.role !== 'ca') {
        return res.status(403).json({ message: 'Not authorized as CA' });
    }
    next();
};

const clientRole = (req, res, next) => {
    if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Not authorized as client' });
    }
    next();
};

module.exports = { protect, caRole, clientRole };