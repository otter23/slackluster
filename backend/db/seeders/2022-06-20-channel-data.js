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
          name: 'data-structures-algorithms ',
          topic: 'Data structure and algorithm resources',
          description: 'Data structure and algorithm resources',
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
          ownerId: 2,
          name: 'when-in-doubt-print-it-out',
          topic: 'for all your debugging needs',
          description:
            'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
          isPrivate: false,
        },
        {
          ownerId: 2,
          name: 'wordle',
          topic: "Please don't post wordles anywhere else",
          description:
            'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
          isPrivate: false,
        },

        // {
        //   ownerId: 2,
        //   name: 'banana-milk',
        //   topic: 'Self explanatory',
        //   description: 'jan cohort inside jokes',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 1,
        //   name: 'bitcoin',
        //   topic: null,
        //   description: null,
        //   isPrivate: true,
        // },
        // {
        //   ownerId: 2,
        //   name: 'bobarz',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: true,
        // },

        // {
        //   ownerId: 2,
        //   name: 'capstone-projects',
        //   topic: 'Post your project links here',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'louisiana-cbd',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'cheesecake-is-not-a-pie',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'cool-cool-cool',
        //   topic: 'cool',
        //   description: 'The coolest channel',
        //   isPrivate: false,
        // },

        // {
        //   ownerId: 1,
        //   name: 'design',
        //   topic: 'all things design',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'granof-the-grey',
        //   topic: 'never won a kahoot T.T',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'hello',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'hot-mic',
        //   topic: null,
        //   description:
        //     'This channel is for all those who forgot to mute their mic.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 1,
        //   name: 'help-requests',
        //   topic: null,
        //   description: 'Ask your coding related questions here',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'jan-cohort-2022-GOAT',
        //   topic: 'Best App Academy cohort',
        //   description: 'Great group of people',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'joon-x-leo',
        //   topic: null,
        //   description: 'The greatest friendship there ever was',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 1,
        //   name: 'memes',
        //   topic: 'Productivity zero',
        //   description: 'Post your memes here',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'memails',
        //   topic: null,
        //   description: 'Jan cohort inside jokes',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'microsoft-paint',
        //   topic: "Homage to the good ol' days",
        //   description: 'Declare your love for microsoft paint here',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'milk-the-mocha',
        //   topic: "Homage to the good ol' days",
        //   description: 'Declare your love for microsoft paint here',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 1,
        //   name: 'movies',
        //   topic: null,
        //   description: null,
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'novohort',
        //   topic: 'top secret company',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'o-w-l',
        //   topic: 'the order',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'reduce',
        //   topic: 'best array method',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'return-oof',
        //   topic: 'If all else fails...',
        //   description: 'If all else fails return "oof".',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'shower-shirt',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'sleeve-hotdog',
        //   topic: 'always be prepared',
        //   description:
        //     "If things are not going well just pull out the ol' sleeve hotdog.",
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'touch-grass',
        //   topic: 'all things outdoors',
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'var',
        //   topic: 'All things var',
        //   description: 'This channel may have been deprecated',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'vests',
        //   topic: 'A tank top is not a vest',
        //   description: 'Do not ever let anyone tell you otherwise',
        //   isPrivate: false,
        // },
        // {
        //   ownerId: 2,
        //   name: 'wanderlust',
        //   topic: null,
        //   description:
        //     'This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.',
        //   isPrivate: false,
        // },

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
