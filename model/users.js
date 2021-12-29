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
    email : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: true
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    socialId: {
        type: Sequelize.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'users',
    timestamps: false
    }
)

//sequelize.sync({force: true})
module.exports = User