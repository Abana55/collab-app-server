const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');


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
            // Find the user by email
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Check if the password is correct
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Create JWT token
            const token = jwt.sign(
                { userId: user.id }, // Use Sequelize model primary key field (id)
                process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env file
                { expiresIn: '24h' }
            );
            

            res.json({ token, userId: user.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AuthController;