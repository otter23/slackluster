'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      //prettier-ignore
      [
        {email: "demo1@user.io", username: "Demo User1", hashedPassword: bcrypt.hashSync('password'), },
        {email: "demo2@user.io", username: "Demo User2", hashedPassword: bcrypt.hashSync('password'), },
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
