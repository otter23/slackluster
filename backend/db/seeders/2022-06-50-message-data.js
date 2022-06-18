'use strict';

//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
new Date(2021, 5, 17, 14, 30).valueOf();
const date1 = new Date(1623965400000);
const date11 = new Date(1623965400000 + 100);
const date111 = new Date(1623965400000 + 200);

const date2 = new Date(1623965400000 + 1000);
const date3 = new Date(1623965400000 + 1000 * 2);
const date4 = new Date(1623965400000 + 1000 * 3);
const date5 = new Date(1623965400000 + 1000 * 4);
const date6 = new Date(1623965400000 + 1000 * 5);
const date7 = new Date(1623965400000 + 1000 * 6);
const date8 = new Date(1623965400000 + 1000 * 7);
const date9 = new Date(1623965400000 + 1000 * 8);
const date10 = new Date(1623965400000 + 1000 * 9);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /* Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert(
      'Messages',
      //prettier-ignore
      [
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Welcome to Slackluster!', createdAt: date1 },
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Thank you for checking out my slack clone!', createdAt: date2 },
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Feel free to navigate around the site and create, edit, and delete channels and messages.', createdAt: date3 },

        // { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: 'Wow looks great!', createdAt: date3 },
        // { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: '4 message in the channel', createdAt: date4 },
        // { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '5 message in the channel', createdAt: date5 },
        // { ownerId: 2, channelId: 1, groupId: null, threadId: null, content: '6 message in the channel', createdAt: date6 },
        // { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '7 message in the channel', createdAt: date7 },
        // { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '8 message in the channel', createdAt: date8 },
        // { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '9 message in the channel', createdAt: date9 },
        // { ownerId: 1, channelId: 1, groupId: null, threadId: null, content: '10 message in the channel',createdAt: date10 },

        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '11 message in the channel', createdAt: date1 },
        // { ownerId: 2, channelId: 2, groupId: null, threadId: null, content: '12 message in the channel', createdAt: date2 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '13 message in the channel', createdAt: date3 },
        // { ownerId: 2, channelId: 2, groupId: null, threadId: null, content: '14 message in the channel', createdAt: date4 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '15 message in the channel', createdAt: date5 },
        // { ownerId: 2, channelId: 2, groupId: null, threadId: null, content: '16 message in the channel', createdAt: date6 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '17 message in the channel', createdAt: date7 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '18 message in the channel', createdAt: date8 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '19 message in the channel', createdAt: date9 },
        // { ownerId: 1, channelId: 2, groupId: null, threadId: null, content: '20 message in the channel',createdAt: date10 },

        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '21 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '22 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '23 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '24 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '25 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '26 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '27 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '28 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '29 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 3, groupId: null, threadId: null, content: '30 message in the channel',createdAt: date10 },

        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '31 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '32 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '33 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '34 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '35 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '36 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '37 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '38 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '39 message in the channel',createdAt: date10 },
        // { ownerId: 2, channelId: 4, groupId: null, threadId: null, content: '40 message in the channel',createdAt: date10 },

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
