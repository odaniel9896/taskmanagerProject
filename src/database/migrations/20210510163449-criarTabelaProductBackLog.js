'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('productBacklogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priorityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "priorities",
          key: "id"
        },
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id"
        },
      },
      sprintId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    queryInterface.dropTable("productBacklogs")
  }
};
