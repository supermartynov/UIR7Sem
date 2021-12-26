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
        allowNull: true
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
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'users',
    timestamps: false
    }
)

//sequelize.sync({force: true})
module.exports = User