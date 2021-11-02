const { Sequelize, DataTypes, Model, sequelize } = require('../config/db.js');


class User extends Model{}
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hash: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    sault: {
        type: Sequelize.STRING,
        //allowNull: false
    },

}, {
    sequelize,
    modelName: 'users',
    timestamps: false
    }
)

module.exports = User