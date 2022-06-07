'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      channelId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      threadId: DataTypes.INTEGER,
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {}
  );
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: 'ownerId' });
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' });
    Message.belongsTo(models.Group, { foreignKey: 'groupId' });
    Message.belongsTo(models.Thread, { foreignKey: 'threadId' });
  };
  return Message;
};
