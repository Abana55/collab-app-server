require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const winston = require('winston');

const app = express();

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

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

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Collaboration App API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});