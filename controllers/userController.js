// userController.js
const db = require('../utils/database');

const getUsers = async (req, res) => {
    try {
        const [users, _] = await db.query('SELECT * FROM users');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
};

// Add more functions for other user-related operations

module.exports = {
    getUsers,
    // Export other functions here
};