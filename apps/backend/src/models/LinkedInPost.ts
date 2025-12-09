import { DataTypes } from "sequelize";
import { sequelize } from "../db/index";

export const LinkedInPost = sequelize.define("LinkedInPost", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  engagement_score: { type: DataTypes.FLOAT },
  embedding: { type: DataTypes.JSONB }
});
