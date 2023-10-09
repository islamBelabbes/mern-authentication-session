export const checkFormikErrors = (errorObject) => {
  if (typeof errorObject === "object") {
    return Object.keys(errorObject).length > 0;
  }

  if (typeof errorObject === "boolean" && errorObject === true) {
    return true;
  }
  return false;
};
export const isRequireRoles = (requiredRoles) => {
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) return false;
  return true;
};
