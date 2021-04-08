const { DataTypes } = require('sequelize');
const db = require('../db')

const Pet = db.define('pet', {
    petName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    petAge: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }, 
    ageMetric: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeOfPet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Pet;