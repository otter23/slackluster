'use strict';

//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
// new Date(2021, 5, 17, 14, 30).valueOf(); //1623965400000
const dateJune1 = new Date(1623965400000);
const dateJune2 = new Date(1623965400000 + 60000);
const dateJune3 = new Date(1623965400000 + 60000 * 2);
const dateJune4 = new Date(1623965400000 + 60000 * 3);
const dateJune5 = new Date(1623965400000 + 60000 * 4);
const dateJune6 = new Date(1623965400000 + 60000 * 5);
const dateJune7 = new Date(1623965400000 + 60000 * 6);
const dateJune8 = new Date(1623965400000 + 60000 * 7);
const dateJune9 = new Date(1623965400000 + 60000 * 8);
const dateJune10 = new Date(1623965400000 + 60000 * 9);
const dateJune11 = new Date(1623965400000 + 60000 * 10);
const dateJune12 = new Date(1623965400000 + 60000 * 11);
const dateJune13 = new Date(1623965400000 + 60000 * 12);

// new Date(2021, 6, 10, 14, 30).valueOf(); //1625952600000
const dateJuly1 = new Date(1625952600000);
const dateJuly2 = new Date(1625952600000 + 60000);
const dateJuly3 = new Date(1625952600000 + 60000 * 2);
const dateJuly4 = new Date(1625952600000 + 60000 * 3);
const dateJuly5 = new Date(1625952600000 + 60000 * 4);
const dateJuly6 = new Date(1625952600000 + 60000 * 5);
const dateJuly7 = new Date(1625952600000 + 60000 * 6);
const dateJuly8 = new Date(1625952600000 + 60000 * 7);
const dateJuly9 = new Date(1625952600000 + 60000 * 8);
const dateJuly10 = new Date(1625952600000 + 60000 * 9);
const dateJuly11 = new Date(1625952600000 + 60000 * 10);
const dateJuly12 = new Date(1625952600000 + 60000 * 11);
const dateJuly13 = new Date(1625952600000 + 60000 * 12);

// new Date(2021, 7, 12, 14, 30).valueOf(); //1628803800000
const dateAug1 = new Date(1628803800000);
const dateAug2 = new Date(1628803800000 + 60000);
const dateAug3 = new Date(1628803800000 + 60000 * 2);
const dateAug4 = new Date(1628803800000 + 60000 * 3);
const dateAug5 = new Date(1628803800000 + 60000 * 4);
const dateAug6 = new Date(1628803800000 + 60000 * 5);
const dateAug7 = new Date(1628803800000 + 60000 * 6);
const dateAug8 = new Date(1628803800000 + 60000 * 7);
const dateAug9 = new Date(1628803800000 + 60000 * 8);
const dateAug10 = new Date(1628803800000 + 60000 * 9);
const dateAug11 = new Date(1628803800000 + 60000 * 10);
const dateAug12 = new Date(1628803800000 + 60000 * 11);
const dateAug13 = new Date(1628803800000 + 60000 * 12);

// new Date(2021, 8, 1, 14, 30).valueOf(); //1630531800000
const dateSept1 = new Date(1630531800000);
const dateSept2 = new Date(1630531800000 + 60000);
const dateSept3 = new Date(1630531800000 + 60000 * 2);
const dateSept4 = new Date(1630531800000 + 60000 * 3);
const dateSept5 = new Date(1630531800000 + 60000 * 4);
const dateSept6 = new Date(1630531800000 + 60000 * 5);
const dateSept7 = new Date(1630531800000 + 60000 * 6);
const dateSept8 = new Date(1630531800000 + 60000 * 7);

// new Date(2021, 8, 3, 14, 30).valueOf(); //1630704600000
const dateSep1 = new Date(1630704600000);
const dateSep2 = new Date(1630704600000 + 60000);
const dateSep3 = new Date(1630704600000 + 60000 * 2);
const dateSep4 = new Date(1630704600000 + 60000 * 3);
const dateSep5 = new Date(1630704600000 + 60000 * 4);
const dateSep6 = new Date(1630704600000 + 60000 * 5);
const dateSep7 = new Date(1630704600000 + 60000 * 6);
const dateSep8 = new Date(1630704600000 + 60000 * 7);
const dateSep9 = new Date(1630704600000 + 60000 * 8);
const dateSep10 = new Date(1630704600000 + 60000 * 9);
const dateSep11 = new Date(1630704600000 + 60000 * 10);
const dateSep12 = new Date(1630704600000 + 60000 * 11);
const dateSep13 = new Date(1630704600000 + 60000 * 12);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /* Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert(
      'Messages',
      //prettier-ignore
      [
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Welcome to Slackluster!', createdAt: dateJune1 },
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Thank you for checking out my slack clone!', createdAt: dateJune2 },
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Feel free to navigate around the site and create, edit, and delete channels and messages.', createdAt: dateJune3 },
        { ownerId: 3, channelId: 1, groupId: null, threadId: null, content: 'Check out the #wordle channel to see an example of how messages from multiple users are displayed over time.', createdAt: dateJuly7 },


        //Wordle Channel Messages
        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wordle 275 5/6\n⬛⬛⬛🟨⬛\n⬛🟨🟨🟩🟨\n🟨⬛🟨🟩🟨\n🟨🟩🟨🟩⬛\n🟩🟩🟩🟩🟩', createdAt: dateJune1 },
        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 275 3/6\n⬛⬛⬛⬛⬛\n⬛🟨🟩⬛⬛\n🟩🟩🟩🟩🟩', createdAt: dateJune2 },
        { ownerId: 3, channelId: 6, groupId: null, threadId: null, content: 'Wordle 275 2/6\n⬛🟩⬛🟨🟩\n🟩🟩🟩🟩🟩', createdAt: dateJune3 },
        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Nice, awesome job!', createdAt: dateJune4 },

        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wordle 300 6/6\n⬛🟨⬛⬛⬛\n⬛🟩⬛⬛⬛\n⬛⬛⬛⬛⬛\n🟨⬛⬛⬛⬛\n🟩🟩🟩⬛🟩\n🟩🟩🟩🟩🟩', createdAt: dateJuly4 },
        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'This one was a toughie!', createdAt: dateJuly5 },
        { ownerId: 3, channelId: 6, groupId: null, threadId: null, content: 'Wordle 300 4/6\n⬛⬛🟨🟨⬛\n⬛⬛⬛⬛⬛\n⬛⬛🟨⬛⬛\n🟩🟩🟩🟩🟩', createdAt: dateJuly7 },
        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 300 4/6\n🟨🟨⬛🟨🟨\n🟨🟩⬛🟨🟨\n⬛🟩🟩🟩🟩\n🟩🟩🟩🟩🟩', createdAt: dateJuly9 },


        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 325 3/6\n⬛🟨⬛🟩⬛\n⬛⬛🟨🟩🟩\n🟩🟩🟩🟩🟩', createdAt: dateAug5 },
        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wordle 325 4/6\n🟨⬛⬛⬛🟨\n⬛⬛⬛🟨🟩\n⬛🟩🟩🟩🟩\n🟩🟩🟩🟩🟩', createdAt: dateAug10 },
        { ownerId: 3, channelId: 6, groupId: null, threadId: null, content: 'Wordle 325 5/6\n🟨🟨⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛🟨🟨⬛\n🟩🟩🟩⬛⬛\n🟩🟩🟩🟩🟩', createdAt: dateAug12 },

        { ownerId: 3, channelId: 6, groupId: null, threadId: null, content: 'Wordle 373 3/6\n⬛⬛⬛🟨🟨\n⬛🟩🟨🟨🟨\n🟩🟩🟩🟩🟩', createdAt: dateSept1 },
        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wordle 373 4/6\n⬛⬛🟨⬛⬛\n⬛⬛⬛🟨🟨\n⬛🟩🟨🟨🟨\n🟩🟩🟩🟩🟩', createdAt: dateSept3 },
        // { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 373 4/6\n⬛⬛⬛⬛🟩\n⬛⬛🟨⬛🟩\n🟨🟨⬛⬛🟩\n🟩🟩🟩🟩🟩', createdAt: dateSept5 },
        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 373 1/6\n🟩🟩🟩🟩🟩', createdAt: dateSept5 },
        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wow, what are the odds!', createdAt: dateSept7 },


        { ownerId: 7, channelId: 6, groupId: null, threadId: null, content: 'Wordle 375 6/6\n⬛⬛⬛⬛⬛\n⬛🟨⬛⬛⬛\n⬛⬛🟨⬛⬛\n🟨🟨🟨⬛⬛\n🟨🟩🟩⬛🟨\n🟩🟩🟩🟩🟩', createdAt: dateSep11 },
        { ownerId: 3, channelId: 6, groupId: null, threadId: null, content: 'Wordle 375 3/6\n⬛⬛🟨⬛⬛\n⬛🟨⬛🟨⬛\n🟩🟩🟩🟩🟩', createdAt: dateSep13 },
        { ownerId: 1, channelId: 6, groupId: null, threadId: null, content: 'Wordle 375 4/6\n⬛🟨⬛⬛⬛\n⬛⬛🟨⬛⬛\n⬛🟩🟩🟨🟨\n🟩🟩🟩🟩🟩', createdAt: dateSep13 },



      //Diversity Channel Messages

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
