'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('prioritys',
      [
        {
          priority: 'Baixa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          priority: 'Media',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          priority: 'Alta',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          priority: 'Para ontem',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prioritys', null, {})
  }
};