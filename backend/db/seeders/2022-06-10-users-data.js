'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      //prettier-ignore
      [
        {email: "demo@user.io", username: "demoUser", hashedPassword: bcrypt.hashSync('password'), },
        {email: "newUser@user.io", username: "newUser", hashedPassword: bcrypt.hashSync('password'), },
        {email: "elan@user.io", username: "elan", hashedPassword: bcrypt.hashSync('password'), },

        {email: "pam@user.io", username: "pam", hashedPassword: bcrypt.hashSync('password'), },
        {email: "greg@user.io", username: "greg", hashedPassword: bcrypt.hashSync('password'), },
        {email: "kathe@user.io", username: "kathe", hashedPassword: bcrypt.hashSync('password'), },

        {email: "albert@user.io", username: "albert", hashedPassword: bcrypt.hashSync('password'), },
        {email: "alex@user.io", username: "alex", hashedPassword: bcrypt.hashSync('password'), },
        {email: "april@user.io", username: "april", hashedPassword: bcrypt.hashSync('password'), },
        {email: "bill@user.io", username: "bill", hashedPassword: bcrypt.hashSync('password'), },
        {email: "brian@user.io", username: "brian", hashedPassword: bcrypt.hashSync('password'), },
        {email: "chuck@user.io", username: "chuck", hashedPassword: bcrypt.hashSync('password'), },
        {email: "connie@user.io", username: "connie", hashedPassword: bcrypt.hashSync('password'), },
        {email: "conniex@user.io", username: "conniex", hashedPassword: bcrypt.hashSync('password'), },
        {email: "dan@user.io", username: "dan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "elee@user.io", username: "elee", hashedPassword: bcrypt.hashSync('password'), },
        {email: "eric@user.io", username: "eric", hashedPassword: bcrypt.hashSync('password'), },
        {email: "helen@user.io", username: "helen", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jai@user.io", username: "jai", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jolene@user.io", username: "jolene", hashedPassword: bcrypt.hashSync('password'), },
        {email: "karen@user.io", username: "karen", hashedPassword: bcrypt.hashSync('password'), },
        {email: "ken@user.io", username: "ken", hashedPassword: bcrypt.hashSync('password'), },
        {email: "kevin@user.io", username: "kevin", hashedPassword: bcrypt.hashSync('password'), },
        {email: "lan@user.io", username: "lan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "laura@user.io", username: "laura", hashedPassword: bcrypt.hashSync('password'), },
        {email: "lisa@user.io", username: "lisa", hashedPassword: bcrypt.hashSync('password'), },
        {email: "mark@user.io", username: "mark", hashedPassword: bcrypt.hashSync('password'), },
        {email: "peony@user.io", username: "peony", hashedPassword: bcrypt.hashSync('password'), },
        {email: "rosa@user.io", username: "rosa", hashedPassword: bcrypt.hashSync('password'), },
        {email: "victor@user.io", username: "victor", hashedPassword: bcrypt.hashSync('password'), },
        {email: "vinay@user.io", username: "vinay", hashedPassword: bcrypt.hashSync('password'), },
        {email: "ryan@user.io", username: "ryan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "sam@user.io", username: "sam", hashedPassword: bcrypt.hashSync('password'), },
        {email: "wei@user.io", username: "wei", hashedPassword: bcrypt.hashSync('password'), },
        {email: "wilson@user.io", username: "wilson", hashedPassword: bcrypt.hashSync('password'), },

        {email: "abhishek@user.io", username: "abhishek", hashedPassword: bcrypt.hashSync('password'), },
        {email: "agustin@user.io", username: "agustin", hashedPassword: bcrypt.hashSync('password'), },
        {email: "anthony@user.io", username: "anthony", hashedPassword: bcrypt.hashSync('password'), },
        {email: "ara@user.io", username: "ara", hashedPassword: bcrypt.hashSync('password'), },
        {email: "attiya@user.io", username: "attiya", hashedPassword: bcrypt.hashSync('password'), },
        {email: "beau@user.io", username: "beau", hashedPassword: bcrypt.hashSync('password'), },
        {email: "brendan@user.io", username: "brendan", hashedPassword: bcrypt.hashSync('password'), },
        // {email: "brian@user.io", username: "brian", hashedPassword: bcrypt.hashSync('password'), },
        {email: "briana@user.io", username: "briana", hashedPassword: bcrypt.hashSync('password'), },
        {email: "celeste@user.io", username: "celeste", hashedPassword: bcrypt.hashSync('password'), },
        {email: "chris@user.io", username: "chris", hashedPassword: bcrypt.hashSync('password'), },
        {email: "darren@user.io", username: "darren", hashedPassword: bcrypt.hashSync('password'), },
        {email: "david@user.io", username: "david", hashedPassword: bcrypt.hashSync('password'), },
        {email: "ethan@user.io", username: "ethan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "fang@user.io", username: "fang", hashedPassword: bcrypt.hashSync('password'), },
        {email: "frances@user.io", username: "frances", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jingling@user.io", username: "jingling", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jon@user.io", username: "jon", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jonathon@user.io", username: "jonathon", hashedPassword: bcrypt.hashSync('password'), },
        {email: "joon@user.io", username: "joon", hashedPassword: bcrypt.hashSync('password'), },
        {email: "josh@user.io", username: "josh", hashedPassword: bcrypt.hashSync('password'), },
        // {email: "kevin@user.io", username: "kevin", hashedPassword: bcrypt.hashSync('password'), },
        {email: "lincoln@user.io", username: "lincoln", hashedPassword: bcrypt.hashSync('password'), },
        {email: "leo@user.io", username: "leo", hashedPassword: bcrypt.hashSync('password'), },
        {email: "maica@user.io", username: "maica", hashedPassword: bcrypt.hashSync('password'), },
        // {email: "mark@user.io", username: "mark", hashedPassword: bcrypt.hashSync('password'), },
        {email: "mason@user.io", username: "mason", hashedPassword: bcrypt.hashSync('password'), },
        {email: "matt@user.io", username: "matt", hashedPassword: bcrypt.hashSync('password'), },
        {email: "noel@user.io", username: "noel", hashedPassword: bcrypt.hashSync('password'), },
        {email: "paul@user.io", username: "paul", hashedPassword: bcrypt.hashSync('password'), },
        {email: "kai@user.io", username: "kai", hashedPassword: bcrypt.hashSync('password'), },
        // {email: "sam@user.io", username: "sam", hashedPassword: bcrypt.hashSync('password'), },
        {email: "lana@user.io", username: "lana", hashedPassword: bcrypt.hashSync('password'), },
        {email: "vee@user.io", username: "vee", hashedPassword: bcrypt.hashSync('password'), },
        {email: "vernyoon@user.io", username: "vernyoon", hashedPassword: bcrypt.hashSync('password'), },
        {email: "xiaowen@user.io", username: "xiaowen", hashedPassword: bcrypt.hashSync('password'), },

        {email: "adrian@user.io", username: "adrian", hashedPassword: bcrypt.hashSync('password'), },
        {email: "alec@user.io", username: "alec", hashedPassword: bcrypt.hashSync('password'), },
        {email: "allie@user.io", username: "allie", hashedPassword: bcrypt.hashSync('password'), },
        {email: "caleb@user.io", username: "caleb", hashedPassword: bcrypt.hashSync('password'), },
        {email: "franco@user.io", username: "franco", hashedPassword: bcrypt.hashSync('password'), },
        {email: "hector@user.io", username: "hector", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jeff@user.io", username: "jeff", hashedPassword: bcrypt.hashSync('password'), },
        {email: "tom@user.io", username: "tom", hashedPassword: bcrypt.hashSync('password'), },
        {email: "vladimir@user.io", username: "vladimir", hashedPassword: bcrypt.hashSync('password'), },
        {email: "whit@user.io", username: "whit", hashedPassword: bcrypt.hashSync('password'), },

      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: {
          [Op.in]: ['Demo User1', 'Demo User2'],
        },
      },
      {}
    );
  },
};
