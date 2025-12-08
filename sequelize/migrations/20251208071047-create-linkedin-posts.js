"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LinkedInPosts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      content: { type: Sequelize.TEXT, allowNull: false },
      engagement_score: { type: Sequelize.FLOAT, allowNull: true },
      embedding: { type: Sequelize.JSONB, allowNull: true },

      // 👇 ADD THIS — the pgvector column
      embedding_vector: { type: "vector(1536)", allowNull: true },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LinkedInPosts");
  }
};
