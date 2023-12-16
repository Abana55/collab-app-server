const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your Sequelize config

class User extends Model {}

User.init({
    // Define attributes
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Model options
    sequelize,
    modelName: 'User'
});

module.exports = User;