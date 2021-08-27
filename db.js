const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.ROMAN, {
  dialect: "postgres",
  ssl: process.env.ENVIRONMENT === "production",
});

module.exports = sequelize;
