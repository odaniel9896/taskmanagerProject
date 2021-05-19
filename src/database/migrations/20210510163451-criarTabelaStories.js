'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('sprintBacklogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      productBacklogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "productBacklogs",
          key: "id"
        },
      },
      sprintId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sprints",
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
    queryInterface.dropTable("sprintBacklogs")
  }
};
