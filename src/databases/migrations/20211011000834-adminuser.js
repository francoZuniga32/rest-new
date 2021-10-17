'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',[{
      name: "franco",
      email: "franco@email.com",
      pass: "1234",
      admin: true,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users',{
      name: "franco"
    })
  }
};
