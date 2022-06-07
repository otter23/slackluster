const express = require('express');
const morgan = require('morgan'); //server request/response logger middleware
const helmet = require('helmet'); //security middleware
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize'); //sequelize error handler

//create environment indicator var
const { environment } = require('./config');
const isProduction = environment === 'production';

//import index.js of routes, which then routes to all other routes
const routes = require('./routes');

const app = express();

//ADD MIDDLEWARE
app.use(morgan('dev'));
app.use(cookieParser()); //parses cookies in req
app.use(express.json()); //parses all incoming json req.body

// ADD SECURITY MIDDLEWARE:

//enable CORS only in development, not needed in production since React/Express resources will come from same origin.
if (!isProduction) {
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your Express app
// policy arg allow images with urls to render in deployment
// should also add xss attach security to react
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

/* Add csurf middleware and configure it to use cookies
  -adds a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response.
  -adds a method on all requests (req.csrfToken()) that will be set to another cookie (XSRF-TOKEN)
    -XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET
      -include in payload before dispatch in React
  -2 cookies work together to provide CSRF protection
*/
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);

//ROUTES
app.use(routes);

//ERROR HANDLING

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation Error';
  }
  next(err);
});

// Final Error receiver and formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    //only send stack in development
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
