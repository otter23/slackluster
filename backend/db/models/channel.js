'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'Channel',
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 80],
          // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
          //no: spaces, periods, or most punctuation. just '-' or '_'
          is: /^[\w-]+$/i,
        },
      },
      topic: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 250],
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 250],
        },
      },
      isPrivate: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {}
  );
  Channel.associate = function (models) {
    Channel.belongsTo(models.User, { foreignKey: 'ownerId' });
    Channel.hasMany(models.Message, { foreignKey: 'channelId' });

    const columnMapping2 = {
      through: 'UserChannel',
      otherKey: 'userId',
      foreignKey: 'channelId',
    };
    Channel.belongsToMany(models.User, columnMapping2);
  };
  return Channel;
};
