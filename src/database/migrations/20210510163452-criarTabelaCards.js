'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initialDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      progressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Progresses",
          key: "id"
        },
      },
      order: {
        type : Sequelize.INTEGER,
        allowNull: false,
      },
      priorityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Priorities",
          key: "id"
        },
      },
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lists",
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
    queryInterface.dropTable("Cards");
  }
};
