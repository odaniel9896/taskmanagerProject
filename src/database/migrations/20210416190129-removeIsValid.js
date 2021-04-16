'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('students', 'isValid'),
    queryInterface.removeColumn('teachers', 'isValid')  
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('students', 'isValid',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,  
    },),
    queryInterface.addColumn('teachers', 'isValid',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,  
    },
    )
  }
};
