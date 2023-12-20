const { Sequelize } = require('sequelize');

require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify the dialect
    pool: {
        max: 10, // Use the same limit as your original pool
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;