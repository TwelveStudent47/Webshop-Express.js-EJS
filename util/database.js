const Sequelize = require('sequelize');

const sequelize = new Sequelize('webshop', 'postgres', 'Laczkofamily60!2007', {
    dialect: "postgres"
});

module.exports = sequelize;