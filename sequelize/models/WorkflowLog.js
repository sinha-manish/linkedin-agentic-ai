"use strict";

module.exports = (sequelize, DataTypes) => {
  const WorkflowLog = sequelize.define(
    "WorkflowLog",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      workflow_name: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      provider: { type: DataTypes.STRING },
      topic: { type: DataTypes.STRING },
      post_id: { type: DataTypes.INTEGER },
      error: { type: DataTypes.TEXT },
      duration_ms: { type: DataTypes.INTEGER },
      meta: { type: DataTypes.JSONB }
    },
    {
      tableName: "WorkflowLogs",
      underscored: true
    }
  );

  return WorkflowLog;
};
