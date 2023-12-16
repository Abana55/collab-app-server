const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your Sequelize config

class Project extends Model {}

Project.init({
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
        defaultValue: 'in progress' // Example default value
    },
    // Assuming a relationship with the User model
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // This is a reference to the Users model
            key: 'id',
        }
    },
    // Additional attributes like project start date, end date, etc.
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Project',
    timestamps: true // If you want Sequelize to automatically manage createdAt and updatedAt
});

module.exports = Project;