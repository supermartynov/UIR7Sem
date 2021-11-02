const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://Elena:@localhost:6005/sql_learning')
//export {Sequelize, DataTypes, Model, sequelize}
module.exports = {Sequelize, DataTypes, Model, sequelize}


//DB_HOST=postgres://Elena:@localhost:6005/sql_learning