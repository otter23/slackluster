'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert(
      'Channels',
      //prettier-ignore
      [
        {
          ownerId: 1,
          name: 'general',
          topic: 'anything',
          description: 'quick description',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'memes',
          topic: 'productivity zero',
          description: 'Post your memes here',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'app-academy',
          topic: 'programming',
          description: 'coding related discussions only ',
          isPrivate: false,
        },
         {
          ownerId: 2,
          name: 'bitcoin',
          topic: null,
          description: null,
          isPrivate: true,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkDelete('Channels', null, {});
  },
};
