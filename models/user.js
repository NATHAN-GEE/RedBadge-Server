const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: process.env.FRENCH,
  },
});

module.exports = User;
