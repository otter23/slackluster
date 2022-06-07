const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
router.use('/api', apiRouter);

// STATIC ROUTES:

// PRODUCTION:
// Serve React build files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    //add cookie XSRF-TOKEN from csrf middleware to response
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  // path provided to express.static is relative to the directory from where you launch node process.
  // path.resolve() method resolves a sequence of paths or path segments into an absolute path (prefixed with CWD if needed).
  // if run express app from another directory, safer to use absolute path of the directory that you want to serve.
  router.use(express.static(path.resolve('../frontend/build')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Development Only:
// Add a XSRF-TOKEN cookie to browser bc backend/frontend are separate
// call GET /api/csrf/restore in frontend before app is loaded to hit this route
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;

//ROUTE used in TESTING - adds a XSRF token to browser
// router.get('/XSRF/token', function (req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

//test to see if CSRF wrapper works
// window
//   .csrfFetch('/api/test', {
//     method: 'POST',
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'password' }),
//   })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
