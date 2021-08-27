const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.ROMAN, {
    dialect: 'postgres',
});

module.exports = sequelize;
