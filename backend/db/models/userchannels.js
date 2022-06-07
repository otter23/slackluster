'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserChannels = sequelize.define(
    'UserChannels',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      channelId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  UserChannels.associate = function (models) {
    // associations can be defined here
  };
  return UserChannels;
};
