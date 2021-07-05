'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('ProductBacklogs', {
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
      checked : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      priorityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Priorities",
          key: "id"
        },
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id"
        },
      },
      sprintId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Sprints",
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
    queryInterface.dropTable("ProductBacklogs")
  }
};
