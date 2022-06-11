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
        {ownerId: 1, name: 'zchannel-1',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-2',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-3',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-4',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-5',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-6',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-7',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-8',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-9',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-10',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-11',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-12',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-13',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-14',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-15',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-16',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-17',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-18',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-19',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-20',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-21',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-22',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-23',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-24',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-25',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-26',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-27',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-28',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-29',isPrivate: false,},
        {ownerId: 1, name: 'zchannel-30',isPrivate: false,},
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
