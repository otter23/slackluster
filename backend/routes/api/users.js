//USERS ROUTE /api/users

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth.js');
const { User, Image, Comment } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//SIGN UP VALIDATIONS
//check all keys in signup post request:  'req.body.key'
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value.')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
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
    const user = await User.signup({ email, username, password });

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

//GET ALL USER IMAGES by userId
router.get(
  '/:userId(\\d+)/images',
  asyncHandler(async (req, res) => {
    //grab id of user
    const userId = req.params.userId;

    //query db for all images that belong to user
    const images = await Image.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.json(images);
  })
);

//GET ALL USER COMMENTS by userId
router.get(
  '/:userId(\\d+)/comments',
  asyncHandler(async (req, res) => {
    //grab id of user
    const userId = req.params.userId;

    //query db for all comments that belong to user
    const comments = await Comment.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.json(comments);
  })
);

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
