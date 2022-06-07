'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      creatorId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Group.associate = function (models) {
    Group.belongsTo(models.User, { foreignKey: 'creatorId' });
    Group.hasMany(models.Message, { foreignKey: 'groupId' });

    const columnMapping4 = {
      through: 'UserGroup',
      otherKey: 'userId',
      foreignKey: 'groupId',
    };
    Group.belongsToMany(models.User, columnMapping4);
  };
  return Group;
};
