'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    'UserGroup',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      hidden: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {}
  );
  UserGroup.associate = function (models) {
    // associations can be defined here
  };
  return UserGroup;
};
