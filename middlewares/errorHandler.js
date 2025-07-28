const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate field value entered',
            field: Object.keys(err.keyPattern)[0]
        });
    }

    if (err.message === 'Not authorized, no token') {
        return res.status(401).json({ message: err.message });
    }

    if (err.message === 'Not authorized, token failed') {
        return res.status(401).json({ message: err.message });
    }

    if (err.message.includes('Not authorized as')) {
        return res.status(403).json({ message: err.message });
    }

    res.status(500).json({ message: 'Something went wrong' });
};

module.exports = errorHandler;