const { DataTypes, Model } = require("sequelize");
const db = require("../db");

const mother = db.define("mother", {
  med: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = mother;
