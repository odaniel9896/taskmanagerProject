'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('invites', 'inviteToken', {
      type: Sequelize.STRING,
      allowNull: true,
    },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('invites', 'inviteToken')
  }
};
