'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    'Channels',
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
  Channels.associate = function (models) {
    // associations can be defined here
  };
  return Channels;
};
