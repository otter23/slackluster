//REST API server - /api

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;

//TEST ROUTE
// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });
// });

// TEST USER AUTH MIDDLEWARES:

//visit http://localhost:5000/api/set-token-cookie, token should be in cookies
// router.get(
//   '/set-token-cookie',
//   asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: 'Demo-lition',
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );

//visit  http://localhost:5000/api/restore-user and see if the response has the demo user information returned as JSON
// router.get('/restore-user', restoreUser, (req, res) => {
//   return res.json(req.user);
// });
