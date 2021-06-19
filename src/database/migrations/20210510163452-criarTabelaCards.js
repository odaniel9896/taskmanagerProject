'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('cards', {
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
      order: {
        type : Sequelize.INTEGER,
        allowNull: false,
      },
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lists",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      storieId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "productBacklogs",
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
    queryInterface.dropTable("cards");
  }
};
