import pkg from 'sequelize';
const {Sequelize, DataTypes, Model} = pkg;
const sequelize = new Sequelize('postgres://Elena:@localhost:6005/sql_learning')

export {Sequelize, DataTypes, Model, sequelize}