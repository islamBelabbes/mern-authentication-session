const isRequireRoles = require("./helpers").isRequireRoles;

describe("check if the current route require a role", () => {
  describe("does not require a role", () => {
    it("should return false", () => {
      expect(isRequireRoles([])).toBe(false);
    });
  });

  describe("does require a role", () => {
    it("should return true", () => {
      expect(isRequireRoles(["admin"])).toBe(true);
    });
  });
});
