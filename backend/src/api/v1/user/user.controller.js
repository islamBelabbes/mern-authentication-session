const response = require("../../../helpers/responseHelper");
const User = require("./user.model");

// @desc get current user
// @route get /api/$version/user/me
// @access privet
const getCurrentUser = async (req, res) => {
  console.log(req.session.userId);
  if (!req.session.userId)
    return response.sendUnauthorized(res, "Not logged in");

  const user = await User.findById(req.session.userId);
  if (!user) return response.sendUnauthorized(res, "Not logged in");

  const { password, ...userData } = user._doc;

  response.sendOk(res, "User received successfully", userData);
};

// @desc get all users
// @route get /api/$version/user/
// @access privet @admin
const getAllUsers = async (req, res) => {
  const user = await User.find().lean();

  const usersData = user.map((item) => {
    const { password, ...userData } = item;
    return userData;
  });
  response.sendOk(res, "users received successfully", usersData);
};

module.exports = { getCurrentUser, getAllUsers };
