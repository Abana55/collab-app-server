const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your Sequelize config

class Artwork extends Model {}

Artwork.init({
    // Define attributes
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true // Allowing null if you want description to be optional
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true // Ensures that the imageUrl is a valid URL
        }
    },
    // If you have a relationship with User, for instance, artist or owner
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
        allowNull: false
    }
}, {
    // Model options
    sequelize,
    modelName: 'Artwork'
});

module.exports = Artwork;