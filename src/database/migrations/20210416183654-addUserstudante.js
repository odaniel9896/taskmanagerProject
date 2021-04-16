'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('students', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
    }),
    queryInterface.addColumn('teachers', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('students', 'userId')
    queryInterface.removeColumn('teachers', 'userId')
  }
};
