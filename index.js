require('dotenv').config();
const express = require('express');
const cors = require('cors');
const winston = require('winston');

const app = express();

// Logger setup (Ensure this is correctly configured)
const logger = winston.createLogger({
    // logger configuration
});

const uploadRoutes = require('./routes/uploadRoutes');
app.use(uploadRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const collaborationRoutes = require('./routes/collaborations');
const messageRoutes = require('./routes/messages');
const artworkRoutes = require('./routes/artworks');
const transactionRoutes = require('./routes/transactions');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/uploads', express.static('uploads'));

// Database setup (assuming you have a separate module for this)
const db = require('./utils/database');

// Verify database connection
db.getConnection((err, connection) => {
    if (err) {
        logger.error('MySQL connection error:', err);
        process.exit(1); // Exit if cannot connect to database
    } else {
        logger.info('Connected to MySQL');
        connection.release();
    }
});

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Collaboration App API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});