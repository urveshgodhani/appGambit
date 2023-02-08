const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const passport = require("passport");
const isAuth = require("../middleware/passport_isAuth");

const router = express.Router();

router.post("/register", register);
// router.post("/login", login);
router.post("/login", passport.authenticate("local"), isAuth, login);

router.post("/forgotpassword", isAuth, forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
