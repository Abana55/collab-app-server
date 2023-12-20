const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING(50), // Specify length
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
    sequelize,
    modelName: 'User',
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Map createdAt to created_at column
    updatedAt: 'updated_at' // Map updatedAt to updated_at column
});

module.exports = User;