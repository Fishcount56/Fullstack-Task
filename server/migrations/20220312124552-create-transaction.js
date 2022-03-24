'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        references:{
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      transferProof: {
        type: Sequelize.STRING
      },
      approveDate: {
        type: Sequelize.DATEONLY
      },
      overDate: {
        type: Sequelize.DATEONLY
      },
      userStatus: {
        type: Sequelize.STRING,
        defaultValue: "Not Active"
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "Pending"
      },
      remainActive: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};