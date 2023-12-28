const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const Sequelize = require('sequelize'); // Import Sequelize to access error types



const AuthController = {
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
    
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: 'Email already in use' });
            } else {
                console.error(error); // Log the detailed error
                res.status(500).json({ message: 'An error occurred' });
            }
        }
    },

    // User login
    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
    
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, userId: user.id });
        } catch (error) {
            console.error(error); // Log the detailed error
            if (error instanceof SomeSpecificError) { // Replace with specific error types if known
                res.status(/* appropriate status code */).json({ message: /* specific error message */ });
            } else {
                res.status(500).json({ message: 'An internal server error occurred' });
            }
        }
    }
};

module.exports = AuthController;