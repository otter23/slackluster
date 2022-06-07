'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    onlineStatus: DataTypes.BOOLEAN,
    imageUrl: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};