'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DigestLogs", {
      id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
      user_id: Sequelize.STRING,
      sent_at: Sequelize.DATE,
      status: Sequelize.STRING,
      summary: Sequelize.TEXT
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
