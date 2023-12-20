const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Collaboration extends Model {}

Collaboration.init({
    // Define attributes
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true // Allowing null if the description is optional
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active' // Example default value
    },
    // Foreign keys to User or Artwork models (if applicable)
    creatorUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // This is a reference to the Users model
            key: 'id', // This is the column name of the referenced model
        },
        allowNull: false
    },
    participantUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // This is a reference to the Users model
            key: 'id',
        },
        allowNull: false
    }
    // You can add more fields or references as needed
}, {
    // Model options
    sequelize,
    modelName: 'Collaboration'
});

module.exports = Collaboration;