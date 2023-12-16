const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust path as necessary

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

module.exports = router;