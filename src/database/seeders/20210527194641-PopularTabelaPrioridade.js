'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Priorities',
      [
        {
          priority: 'Baixa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          priority: 'Media',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          priority: 'Alta',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          priority: 'Para ontem',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Priorities', null, {})
  }
};