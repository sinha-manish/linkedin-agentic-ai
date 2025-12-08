"use strict";

module.exports = (sequelize, DataTypes) => {
  const LinkedInPost = sequelize.define(
    "LinkedInPost",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      engagement_score: { type: DataTypes.FLOAT, allowNull: true },
      embedding: { type: DataTypes.JSONB, allowNull: true },
    },
    {
      tableName: "LinkedInPosts",
      underscored: true,
    }
  );

  return LinkedInPost;
};
