'use strict';

// new Date(2022, 06, 07, 5,40).valueOf()
const date1 = new Date(1657197000000);
const date2 = new Date(1657197000000 + 1000);
const date3 = new Date(1657197000000 + 1000 * 2);
const date4 = new Date(1657197000000 + 1000 * 3);
const date5 = new Date(1657197000000 + 1000 * 4);
const date6 = new Date(1657197000000 + 1000 * 5);
const date7 = new Date(1657197000000 + 1000 * 6);
const date8 = new Date(1657197000000 + 1000 * 7);
const date9 = new Date(1657197000000 + 1000 * 8);
const date10 = new Date(1657197000000 + 1000 * 9);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /* Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert(
      'Messages',
      //prettier-ignore
      [
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '1 message in the channel', createdAt: date1 },
        { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: '2 message in the channel', createdAt: date2 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '3 message in the channel', createdAt: date3 },
        { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: '4 message in the channel', createdAt: date4 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '5 message in the channel', createdAt: date5 },
        { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: '6 message in the channel', createdAt: date6 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '7 message in the channel', createdAt: date7 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '8 message in the channel', createdAt: date8 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '9 message in the channel', createdAt: date9 },
        { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '10 message in the channel',createdAt: date10 },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkDelete('Messages', null, {});
  },
};
