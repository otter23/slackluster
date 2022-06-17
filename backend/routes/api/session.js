//SESSION ROUTE /api/session

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//LOGIN VALIDATIONS
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  // check('email')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide a value for Email Address'),
  handleValidationErrors,
];

// RESTORE SESSION USER
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    //send safe user object if session found
    return res.json({
      user: user.toSafeObject(),
    });
    //send empty obj if no user session found
  } else return res.json({});
});

// LOG IN
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    //if user not found in db throw error
    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid username / email address or password.'];
      return next(err);
    }

    //if User found, add jwt cookie to response
    await setTokenCookie(res, user);

    //send response with user info
    return res.json({
      user,
    });
  })
);

// LOG OUT
router.delete('/logout', (_req, res) => {
  //sends request to remove JWT from the browser's cookies
  //method updates the  "Set-Cookie": HTTP response header
  //sets cookie with name 'token' to an empty value
  //cookie was a session cookie because expires/max-age was unspecified
  //so also includes an expires field in the past or sets max-age to 0 or neg value
  res.clearCookie('token'); //cookie key name
  //for some browsers, also need to include the original "cookie options", e.g. domain or path
  //for production may need to include
  return res.json({ message: 'success' }); //need to send response to client for instructions to be received
});

module.exports = router;

//TESTING SESSION ROUTES

//create a XSRF token first using token test route
// visit http://localhost:5000/XSRF/token

//log-in => logged in user info obj
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
//   body: JSON.stringify({ credential: 'DemoUser', password: 'password1' }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//invalid Log-in => object of error messages
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
//   body: JSON.stringify({ credential: 'DemoUser', password: 'Hello World!' }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//invalid Log-in => object of error messages
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
//   body: JSON.stringify({ credential: '', password: 'password' }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//log-out => success
// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': `<value of XSRF-TOKEN cookie>`,
//   },
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
