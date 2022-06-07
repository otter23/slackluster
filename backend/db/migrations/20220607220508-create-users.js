'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, //adds indexed constrain by default
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true, //adds indexed constrain by default
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      onlineStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        //creates default value for this column
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
