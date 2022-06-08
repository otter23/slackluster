'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert('Groups', [{ creatorId: 1 }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkDelete('Groups', null, {});
  },
};
