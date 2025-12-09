"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserMemory", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.STRING, allowNull: false },

      // Learned weights
      interests_vector: { type: "vector(1536)" },     // user preference embedding
      topics_history: { type: Sequelize.JSONB },      // [{topic, count}]
      liked_posts: { type: Sequelize.JSONB },         // post_ids
      last_updated: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("UserMemory");
  }
};
