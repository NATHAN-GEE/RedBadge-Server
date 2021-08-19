const { DataTypes } = require("sequelize");
const db = require("../db");

const baby = db.define( "baby", {
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  feedingTime1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime5: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime6: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime7: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedingTime8: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wetDiaper1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wetDiaper2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wetDiaper3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soilDiaper1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soilDiaper2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soilDiaper3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = baby;
