const isRequireRoles = (requiredRoles) => {
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) return false;
  return true;
};

module.exports = {
  isRequireRoles,
};
