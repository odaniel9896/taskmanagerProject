'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('sprintPlannings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ata: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    queryInterface.dropTable("sprintPlannings")
  }
};
