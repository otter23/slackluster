'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define(
    'UserChannel',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      channelId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  UserChannel.associate = function (models) {
    // associations can be defined here
  };
  return UserChannel;
};
