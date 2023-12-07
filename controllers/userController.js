const db = require('../database/database');

exports.getAllUsers = async (req, res) => {
    try {
        const [users, _] = await db.query('SELECT * FROM users');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [user, _] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error retrieving user');
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send('Error creating user');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email } = req.body; // Assuming only these fields are updatable
        await db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, req.params.id]);
        res.status(200).send('User updated successfully');
    } catch (err) {
        res.status(500).send('Error updating user');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.status(200).send('User deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
};