const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return next(
//         new ErrorResponse("Please provide an email and password", 400)
//       );
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return next(new ErrorResponse("Invalid Credentials", 401));
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return next(new ErrorResponse("Invalid Credentials", 401));
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };
exports.login = async (req, res) => {
  res.send({ data: req.user });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    console.log("forgor pass", req.user);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse(`${email} is not found`));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: user,
      resetToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid Token"), 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
