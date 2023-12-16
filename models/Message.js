const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your Sequelize config

class Message extends Model {}

Message.init({
    // Define attributes
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Assuming you have a User model
            key: 'id',
        }
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    // Additional fields like read status, timestamps etc.
    readStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'Message',
    timestamps: true // If you want Sequelize to automatically manage createdAt and updatedAt
});

module.exports = Message;