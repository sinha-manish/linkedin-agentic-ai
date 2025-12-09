"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WorkflowLogs", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      workflow_name: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false }, // started, success, failed
      provider: { type: Sequelize.STRING },
      topic: { type: Sequelize.STRING },
      post_id: { type: Sequelize.INTEGER },
      error: { type: Sequelize.TEXT },
      duration_ms: { type: Sequelize.INTEGER },
      meta: { type: Sequelize.JSONB },

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

  async down(queryInterface) {
    await queryInterface.dropTable("WorkflowLogs");
  }
};
