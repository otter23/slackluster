'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      channelId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      threadId: DataTypes.INTEGER,
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {}
  );
  Messages.associate = function (models) {
    // associations can be defined here
  };
  return Messages;
};
