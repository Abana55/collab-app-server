const express = require('express');
const router = express.Router();

// Example user route
router.get('/', (req, res) => {
    res.send('User List');
});

module.exports = router;