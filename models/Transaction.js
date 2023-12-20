const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Transaction extends Model {}

Transaction.init({
    amount: {
        type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending' // Example: 'pending', 'completed', 'failed'
    },
    // References to other entities like User, Artwork, etc.
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id',
        }
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    artworkId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Can be nullable if transactions aren't always about artworks
        references: {
            model: 'Artworks',
            key: 'id',
        }
    },
    // Additional fields as necessary
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true // If you want Sequelize to automatically manage createdAt and updatedAt
});

module.exports = Transaction;