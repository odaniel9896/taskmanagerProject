'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Progresses',
      [
        {
          progress: 'Em andamento',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          progress: 'Não iniciada',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          progress: 'Concluida',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Progresses', null, {})
  }
};