'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return queryInterface.bulkInsert(
      'Channels',

      [
        {
          ownerId: 1,
          name: 'general',
          topic: null,
          description:
            'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'app-academy',
          topic: 'Coding boot camp',
          description: 'Connect with the App Academy alumni network',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'bitcoin',
          topic: null,
          description: null,
          isPrivate: true,
        },
        {
          ownerId: 2,
          name: 'banana-milk',
          topic: 'Self explanatory',
          description: 'jan cohort inside jokes',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'capstone-projects',
          topic: 'Post your project links here',
          description: null,
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'diversity',
          topic:
            'To discuss how to cultivate an inclusive environment, share workplace culture experiences and wisdom from alum to current students, and post events related to diversity and inclusion',
          description: 'To discuss how to cultivate an inclusive environment',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'help-requests',
          topic: null,
          description: 'Ask your coding related questions here',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'jan-cohort-2022',
          topic: 'Best App Academy cohort',
          description: 'Great group of people',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'memes',
          topic: 'Productivity zero',
          description: 'Post your memes here',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'me-mails',
          topic: null,
          description: 'Jan cohort inside jokes',
          isPrivate: false,
        },
        {
          ownerId: 1,
          name: 'microsoft-paint',
          topic: "Homage to the good ol' days",
          description: 'Declare your love for microsoft paint here',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'var-var-vinks',
          topic: 'Everything you ever wanted to know about var',
          description: 'This channel may have been deprecated',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'vests',
          topic: 'A tank top is not a vest',
          description: 'Do not ever let anyone tell you otherwise',
          isPrivate: false,
        },

        // { ownerId: 1, name: 'zchannel-1', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-2', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-3', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-4', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-5', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-6', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-7', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-8', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-9', isPrivate: false },
        // { ownerId: 1, name: 'zchannel-10', isPrivate: false },
        // {ownerId: 1, name: 'zchannel-11',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-12',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-13',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-14',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-15',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-16',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-17',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-18',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-19',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-20',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-21',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-22',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-23',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-24',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-25',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-26',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-27',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-28',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-29',isPrivate: false,},
        // {ownerId: 1, name: 'zchannel-30',isPrivate: false,},
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
