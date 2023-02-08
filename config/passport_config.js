const localStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email }).select("+password");
    if (user == null) {
      return done(null, false);
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
