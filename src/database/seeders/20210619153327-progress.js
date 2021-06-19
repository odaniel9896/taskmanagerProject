'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('progress',
      [
        {
          priority: 'Em andamento',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          priority: 'Não iniciada',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          priority: 'Concluida',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('progress', null, {})
  }
};