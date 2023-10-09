const response = require("../../../helpers/responseHelper");
const authValidation = require("./auth.validation");
const bcrypt = require("bcrypt");
const User = require("../user").Model;

// @desc login a user
// @route POST /api/$version/auth/login
// @access Public
const login = async (req, res) => {
  if (req.session.userId) {
    return req.session.destroy(function (err) {
      if (err) throw err;
      res.clearCookie(process.env.SESSION_NAME);
      response.sendBadRequest(res);
    });
  }

  const { email, password: rawPassword } = req.body;

  // validate
  await authValidation.loginSchema.validate({ email, password: rawPassword });

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) return response.sendNotFound(res, "User not found");

  // match password
  const Match = await bcrypt.compare(rawPassword, user.password);
  if (!Match) return response.sendUnauthorized(res, "Invalid credentials");

  req.session.userId = user._id;
  const { password, ...userData } = user._doc;
  response.sendOk(res, "Login successful", userData);
};
// @desc Register a new user
// @route POST /api/$version/auth/signup
// @access Public
const signUp = async (req, res) => {
  if (req.session.userId) {
    return req.session.destroy(function (err) {
      if (err) throw err;
      res.clearCookie(process.env.SESSION_NAME);
      response.sendBadRequest(res);
    });
  }

  const { email, password, phone } = req.body;

  // validate
  await authValidation.signUpSchema.validate({ email, password, phone });

  // check if user exists
  const user = await User.findOne({ email });
  if (user) return response.sendConflict(res, "User already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // save
  const newUser = new User({
    email,
    password: hashedPassword,
    phone,
  });
  await newUser.save();

  response.sendOk(res, "User created successfully");
};

// @desc logout a user
// @route POST /api/$version/auth/logout
// @access Public

const logout = (req, res) => {
  if (!req.session.userId) return response.sendNoContent(res);
  return req.session.destroy(function (err) {
    if (err) throw err;
    res.clearCookie(process.env.SESSION_NAME);
    response.sendNoContent(res);
  });
};

module.exports = {
  login,
  signUp,
  logout,
};
