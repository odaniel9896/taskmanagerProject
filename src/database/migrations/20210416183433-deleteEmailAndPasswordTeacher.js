'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('teachers', 'email'),
    queryInterface.removeColumn('teachers', 'password')  
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('teachers', 'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },),
    queryInterface.addColumn('teachers', 'password',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    )
  }
};
