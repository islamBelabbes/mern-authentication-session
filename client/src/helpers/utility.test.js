import { checkFormikErrors, isRequireRoles } from "./utility";

describe("checkFormikErrors", () => {
  it("should return true if the errorObject is a non-empty object", () => {
    const errorObject = { field1: "Error 1", field2: "Error 2" };
    const result = checkFormikErrors(errorObject);
    expect(result).toBe(true);
  });

  it("should return true if the errorObject is a boolean and true", () => {
    const errorObject = true;
    const result = checkFormikErrors(errorObject);
    expect(result).toBe(true);
  });

  it("should return false if the errorObject is an empty object", () => {
    const errorObject = {};
    const result = checkFormikErrors(errorObject);
    expect(result).toBe(false);
  });

  it("should return false if the errorObject is a boolean and false", () => {
    const errorObject = false;
    const result = checkFormikErrors(errorObject);
    expect(result).toBe(false);
  });

  it("should return false if the errorObject is not an object or boolean", () => {
    const errorObject = "Not an object or boolean";
    const result = checkFormikErrors(errorObject);
    expect(result).toBe(false);
  });
});

describe("isRequireRoles", () => {
  it("should return true if requiredRoles is a non-empty array", () => {
    const requiredRoles = ["admin", "user"];
    const result = isRequireRoles(requiredRoles);
    expect(result).toBe(true);
  });

  it("should return false if requiredRoles is an empty array", () => {
    const requiredRoles = [];
    const result = isRequireRoles(requiredRoles);
    expect(result).toBe(false);
  });

  it("should return false if requiredRoles is not an array", () => {
    const requiredRoles = "Not an array";
    const result = isRequireRoles(requiredRoles);
    expect(result).toBe(false);
  });
});
