"use strict";

module.exports = (sequelize, DataTypes) => {
  const AgentMemory = sequelize.define(
    "AgentMemory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      key: { type: DataTypes.STRING, allowNull: false },
      value: { type: DataTypes.JSONB },
    },
    {
      tableName: "AgentMemory",
      underscored: true,
    }
  );

  return AgentMemory;
};
