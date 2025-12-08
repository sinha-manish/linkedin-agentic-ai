"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPreferences = sequelize.define(
    "UserPreferences",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tone: { type: DataTypes.STRING, defaultValue: "human-storytelling" },
      industry: { type: DataTypes.STRING },
      goals: { type: DataTypes.JSONB },
    },
    {
      tableName: "UserPreferences",
      underscored: true,
    }
  );

  return UserPreferences;
};
