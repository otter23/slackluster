'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define(
    'UserGroups',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      hidden: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {}
  );
  UserGroups.associate = function (models) {
    // associations can be defined here
  };
  return UserGroups;
};
