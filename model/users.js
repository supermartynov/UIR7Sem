import {Sequelize, DataTypes, Model, sequelize} from "../config/db.js"

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
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
    }
)

// await sequelize.sync(({ force: true }));

export {User}