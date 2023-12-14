require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Initialize express app
const app = express();

// Logger setup with winston

const logger = winston.createLogger({
    level: 'info', // Lowest level of logs to capture (error, warn, info, verbose, debug, silly)
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        // File transport
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});


// Multer for file uploads (if needed)
const upload = multer({ dest: 'uploads/' }); // Configure as needed

// CORS middleware
app.use(cors());

// Helmet for basic security
app.use(helmet());

// Morgan for HTTP request logging
app.use(morgan('dev'));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Database setup (if you have a separate database module)
const db = require('./database/database');

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

// Route handlers
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const collaborationRoutes = require('./routes/collaborations');
const messageRoutes = require('./routes/messages');
const artworkRoutes = require('./routes/artworks');
const transactionRoutes = require('./routes/transactions');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/transactions', transactionRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Collaboration App API');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8000; // Change 5000 to another number
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});