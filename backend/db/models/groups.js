'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    'Groups',
    {
      creatorId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Groups.associate = function (models) {
    // associations can be defined here
  };
  return Groups;
};
