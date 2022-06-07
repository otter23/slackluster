'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    'Thread',
    {
      creatorId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Thread.associate = function (models) {
    Thread.belongsTo(models.User, { foreignKey: 'creatorId' });
    Thread.hasMany(models.Message, { foreignKey: 'threadId' });
  };
  return Thread;
};
