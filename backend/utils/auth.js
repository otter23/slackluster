const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

//import JWT enviro variables
const { jwtConfig } = require('../config');
const { secret, expiresIn } = jwtConfig;

//auth helper Middleware functions

//Set JWT cookie after a user is logged in or signed up
// Sends a JWT Cookie and returns the token added to cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() }, //only include safe user info
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === 'production';

  // Set the token cookie (HTTP-only) on the response
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax',
  });

  return token;
};

//restore user based on jwt cookie contents, add user to request
//if valid jwt cookie exists load session user into req.user

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  //verify and parse JWT payload
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      //find user in db and add to the request
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      //if error, clear token cookie from response
      res.clearCookie('token');
      return next();
    }

    //if no user found, clear token cookie from response
    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// If there is no current user, return an error
const checkUserSession = (req, _res, next) => {
  //if user exists continue on the middleware path
  if (req.user) return next();

  //if no user found, send error
  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
};

const requireAuth = [
  restoreUser, //attempt to get user from JWT
  checkUserSession, //check whether restoreUser was successful, if not throw error
];

//apply restoreUser and requireAuth as pre-middleware to route handlers where needed.
module.exports = { setTokenCookie, restoreUser, requireAuth };
