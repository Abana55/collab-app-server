const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;