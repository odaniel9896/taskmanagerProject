'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Tasks', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      checked : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Cards",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
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
    queryInterface.dropTable("Tasks");
  }
};
