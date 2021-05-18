'use strict';

const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('invites', {
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
      // groupId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "groups",
      //     key: "id"
      //   },
      // },
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
    queryInterface.dropTable("invites")
  }
};
