'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('SprintReviews', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      wasDelivered: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sprintId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Sprints",
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
    queryInterface.dropTable("SprintReviews")
  }
};
