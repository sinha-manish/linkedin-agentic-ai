"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserPreferences", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      tone: { type: Sequelize.STRING, defaultValue: "human-storytelling" },
      industry: { type: Sequelize.STRING, allowNull: true },
      goals: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserPreferences");
  }
};
