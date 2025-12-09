"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WorkflowLogs", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      workflow_name: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false }, // started, success, failed
      provider: { type: Sequelize.STRING, allowNull: true },
      topic: { type: Sequelize.STRING, allowNull: true },
      post_id: { type: Sequelize.INTEGER, allowNull: true },
      error: { type: Sequelize.TEXT, allowNull: true },
      duration_ms: { type: Sequelize.INTEGER, allowNull: true },
      meta: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("WorkflowLogs");
  }
};

