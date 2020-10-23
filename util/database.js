const Sequelize = require('sequelize');

const sequelize = new Sequelize('orderingapp', 'root', 'root', {
    dialect: 'mysql',
    port: '3305',
    host: 'localhost'
});

module.exports = sequelize;
