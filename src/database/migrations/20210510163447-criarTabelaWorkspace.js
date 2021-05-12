'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('workspaces', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      backgroundImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "workspaces",
          key: "id"
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("workspaces");
  }
};