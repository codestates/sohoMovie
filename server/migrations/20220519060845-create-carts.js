'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        onDelete : 'CASCADE',
        references : {
          model: 'users',
          key: 'user_id'
        },
      },
      b_title: {
        type: Sequelize.STRING
      },
      b_date: {
        type: Sequelize.STRING
      },
      b_time: {
        type: Sequelize.STRING
      },
      b_quantity: {
        type: Sequelize.STRING
      },
      b_price: {
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
    await queryInterface.dropTable('carts');
  }
};