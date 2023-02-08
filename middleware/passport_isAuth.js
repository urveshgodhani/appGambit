const ErrorHandler = require("../middleware/error");
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return next(new ErrorHandler("User Is Not Login", 401));
  }
};
module.exports = checkAuthenticated;
