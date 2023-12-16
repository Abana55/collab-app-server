const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    // User data to include in the JWT payload
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    // Sign the token with a secret key
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiry time
    );
};

const verifyToken = (token) => {
    try {
        // Verify the token
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};