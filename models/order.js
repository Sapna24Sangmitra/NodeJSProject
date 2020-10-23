const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payment_total: {
        type: Sequelize.FLOAT
    }
});

module.exports = Order;