const express = require('express');
const router = express.Router();

// Example route: List of users
router.get('/', (req, res) => {
    res.send('User List');
});

// Add more user-related routes here

module.exports = router;