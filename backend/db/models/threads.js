'use strict';
module.exports = (sequelize, DataTypes) => {
  const Threads = sequelize.define(
    'Threads',
    {
      creatorId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Threads.associate = function (models) {
    // associations can be defined here
  };
  return Threads;
};
