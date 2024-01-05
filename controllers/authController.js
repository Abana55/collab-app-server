const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../database/knex'); // path to your Knex configuration

const AuthController = {
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await knex('users').insert({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }).returning('*'); // Modify as per your DB's returning data

            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const user = await knex('users').where({ email: req.body.email }).first();
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, userId: user.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AuthController;