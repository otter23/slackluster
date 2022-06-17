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

        {email: "albert@user.io", username: "albert", hashedPassword: bcrypt.hashSync('password'), },
        {email: "alex@user.io", username: "alex", hashedPassword: bcrypt.hashSync('password'), },
        {email: "april@user.io", username: "april", hashedPassword: bcrypt.hashSync('password'), },
        {email: "brian@user.io", username: "brian", hashedPassword: bcrypt.hashSync('password'), },
        {email: "chuck@user.io", username: "chuck", hashedPassword: bcrypt.hashSync('password'), },
        {email: "connie@user.io", username: "connie", hashedPassword: bcrypt.hashSync('password'), },
        {email: "conniex@user.io", username: "conniex", hashedPassword: bcrypt.hashSync('password'), },
        {email: "dan@user.io", username: "dan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "elan@user.io", username: "elan", hashedPassword: bcrypt.hashSync('password'), },
        {email: "elee@user.io", username: "elee", hashedPassword: bcrypt.hashSync('password'), },
        {email: "eric@user.io", username: "eric", hashedPassword: bcrypt.hashSync('password'), },
        {email: "helen@user.io", username: "helen", hashedPassword: bcrypt.hashSync('password'), },
        {email: "jolene@user.io", username: "jolene", hashedPassword: bcrypt.hashSync('password'), },
        {email: "karen@user.io", username: "karen", hashedPassword: bcrypt.hashSync('password'), },
        {email: "ken@user.io", username: "ken", hashedPassword: bcrypt.hashSync('password'), },
        {email: "kevin@user.io", username: "kevin", hashedPassword: bcrypt.hashSync('password'), },
        {email: "lan@user.io", username: "lan", hashedPassword: bcrypt.hashSync('password'), },
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
