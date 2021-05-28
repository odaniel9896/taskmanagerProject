'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('dailyScrums', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      doneYesterday: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goingToDoDay: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      someObstacle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sprintId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sprints",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    queryInterface.dropTable("dailyScrums")
  }
};
