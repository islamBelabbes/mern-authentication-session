const response = require("../helpers/responseHelper");
const isRequireRoles = require("../helpers/helpers").isRequireRoles;
const User = require("../api/v1/user/user.model");
const isAuth = (requiredRoles) => {
  return async (req, res, next) => {
    const { userId } = req.session;
    // first check if user is logged in
    if (!userId) return response.sendUnauthorized(res);

    // does this route require specific roles?
    if (!isRequireRoles(requiredRoles)) return next();

    // check if user has the required roles
    const user = await User.findById(userId);

    // just extra checking
    if (!user) return response.sendNotFound(res, "User not found");

    // user has required roles? ** if only one roles is there it will pass
    let hasRoles = false;
    requiredRoles.forEach((role) => {
      if (user.roles.includes(role)) hasRoles = true;
    });
    // send the result

    return hasRoles ? next() : response.sendForbidden(res, "Forbidden");
  };
};

module.exports = isAuth;
