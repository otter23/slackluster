//USERS ROUTE /api/users

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth.js');
const { User, Channel } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//SIGN UP VALIDATIONS
//check all keys in signup post request:  'req.body.key'
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email.')
    .isLength({ max: 100 })
    .withMessage('Usernames can’t be longer than 100 characters.')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) return Promise.reject('Email already exists.');
      });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .isLength({ max: 80 })
    .withMessage('Usernames can’t be longer than 80 characters.')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) return Promise.reject('Username already exists.');
      });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*").'
    ),
  // check('confirmPassword')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please confirm password')
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error('Password and Confirm Password do not match.');
  //     }
  //     return true;
  //   }),
  // check('imageUrl')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide an ImageUrl'),
  //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  // .withMessage('imagUrl must be  (i.e. "!@#$%^&*").'),
  handleValidationErrors, //evaluates result of check() middlewares
];

// SIGN UP
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    //throws sequelize validation error(s) if user not successfully created
    //this error gets passed on to the next error handling middleware
    const user = await User.signup({
      email,
      username,
      password,
      onlineStatus: true,
    });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

//GET ALL USER IDS in db
router.get(
  '/ids',
  asyncHandler(async (req, res) => {
    //query db for users
    const users = await User.findAll();

    //grab only userIds
    const safeUsers = {};
    users.forEach((user) => {
      let safeUser = {};
      safeUser.id = user.id;
      safeUser.username = user.username;
      safeUsers[user.id] = safeUser;
    });

    return res.json(safeUsers);
  })
);

//GET ONE USER by userId
router.get(
  '/:userId(\\d+)',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    //query db for userID
    const user = await User.findByPk(userId);
    console.log(user);

    if (user) {
      //send safe user object if session found
      return res.json({
        user: user.toSafeObject(),
      });
      //send empty obj if no user session found
    } else return res.json({});
  })
);

//GET ALL USER CHANNELS by ownerId
router.get(
  '/:userId(\\d+)/channels',
  asyncHandler(async (req, res) => {
    //grab id of user
    const userId = req.params.userId;

    //query db for all channels that belong to user
    const channels = await Channel.findAll({
      where: { ownerId: userId },
      order: [['name', 'ASC']],
    });

    return res.json(channels);
  })
);

//GET ALL USER MESSAGES by ownerId

module.exports = router;

//TESTING USERS ROUTESs:

//GET ALL UserIds
// fetch('/api/users/ids')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//GET ONE UserId
// fetch('/api/users/2')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//create a XSRF token first using token test route
// visit http://localhost:5000/XSRF/token

//sign-up  => created user object
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
//   body: JSON.stringify({
//     email: 'spidey@spider.man',
//     username: 'Spidey',
//     password: 'password',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//test non-unique emails, should return error obj
//test non-unique username
//test bad email format

//Test sign-up validators
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
//   body: JSON.stringify({
//     email: 'firestar@spider.man',
//     username: 'Firestar',
//     password: '',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// Test all of the following
//email field is an empty string
// email field is not an email
// username field is an empty string
// username field is only 3 characters long
// username field is an email
// password field is only 5 characters long
