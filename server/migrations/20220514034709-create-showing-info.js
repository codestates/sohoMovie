'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('showing_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_num: {
        type: Sequelize.INTEGER
      },
      showing_date: {
        type: Sequelize.STRING
      },
      showing_time: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('showing_infos');
  }
};