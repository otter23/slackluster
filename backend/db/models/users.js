'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
          //added isemail validation
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          //custom validator
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Username cannot be an email.');
            }
          },
        },
      },
      title: { type: DataTypes.STRING, validate: { len: [3, 100] } },
      onlineStatus: { type: DataTypes.BOOLEAN, allowNull: false },
      imageUrl: { type: DataTypes.TEXT },
    },
    {
      //add default scope and scopes for user roles to protect sensitive info
      // from being exposed to other users
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    // User.hasMany(models.Image, { foreignKey: 'userId' });
    // User.hasMany(models.Album, { foreignKey: 'userId' });
    // User.hasMany(models.Comment, { foreignKey: 'userId' });
  };

  //Define User Model Methods for use in API authentication flow
  // remember, these cannot be an arrow function because don't want to bind context to wrong place

  //INSTANCE CLASS METHODS

  //return object with only User info that is safe to store in a JWT
  User.prototype.toSafeObject = function () {
    const { id, username, email, onlineStatus } = this; // context will be the User instance
    return { id, username, email, onlineStatus };
  };

  //password validator, compares user inputted password to saved password
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //STATIC CLASS METHODS

  //return a User record based on Id with only currentUser scope columns
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  //return User with scope currentUser based on credentials after validating password
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  //create user based on submitted credentials, hash password before sending to db
  //return created User with scope currentUser
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
