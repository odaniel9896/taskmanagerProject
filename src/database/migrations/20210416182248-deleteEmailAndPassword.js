'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('students', 'email',),
    queryInterface.removeColumn('students', 'password')  
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('students', 'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },),
    queryInterface.addColumn('students', 'password',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    )
  }
};
