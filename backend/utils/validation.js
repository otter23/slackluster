const { validationResult } = require('express-validator');

//check info in the body of request before using it
//using express-validator package to validate body of request
//check(key) => middleware function creator that checks a particular key on the request body
//validationResult(req)  => gathers results of check middleware that were added to the req

// middleware for formatting errors from express-validator middleware
// (note: to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  //gathers results of check middleware that were added to the req
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    //create array of error messages
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    //send error messages in error object to next error handling middleware
    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }

  //if no errors move on to next middleware
  next();
};

module.exports = {
  handleValidationErrors,
};
