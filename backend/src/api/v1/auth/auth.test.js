const supertest = require("supertest");
const CreateServer = require("../../../../app");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

const { app, redisClient } = CreateServer();
let session = require("supertest-session");
let testSession = null;

const preformSignup = async ({ email, password, isAdmin }) => {
  return await testSession.post("/api/v1/auth/signup").send({
    email,
    password,
    phone: "",
    isAdmin,
  });
};
const preformSignIn = async ({ email, password }) => {
  return await testSession.post("/api/v1/auth/login").send({ email, password });
};
const preformSignOut = async () => {
  return await testSession.delete("/api/v1/auth/logout");
};

const signUpPayload = {
  email: "admin@admin.com",
  password: "password",
  phone: "",
  isAdmin: true,
};

const signInPayload = {
  email: "admin@admin.com",
  password: "password",
};

describe("auth", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    testSession = session(app);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await redisClient.quit();
  });

  describe("@POST /api/v1/auth/signup", () => {
    describe("validation Error", () => {
      it("should return 400", async () => {
        const { status } = await preformSignup({
          ...signUpPayload,
          email: "notValidEmail",
        });
        expect(status).toBe(400);
      });
    });
    describe("user signup successfully", () => {
      it("should return 201", async () => {
        const { status } = await preformSignup(signUpPayload);
        expect(status).toBe(201);
      });
    });
    describe("user does already exist", () => {
      it("should return 409", async () => {
        const { status } = await preformSignup(signUpPayload);
        expect(status).toBe(409);
      });
    });
  });

  describe("@POST /api/v1/auth/login", () => {
    describe("validation Error", () => {
      it("should return 400", async () => {
        const { status } = await preformSignIn({
          ...signInPayload,
          email: "notValidEmail",
        });
        expect(status).toBe(400);
      });
    });
    describe("user does does not exist", () => {
      it("should return 404", async () => {
        const { status } = await preformSignIn({
          ...signInPayload,
          email: "not@exist.user",
        });
        expect(status).toBe(404);
      });
    });
    describe("user logged in successfully", () => {
      it("should return 200", async () => {
        const { status } = await preformSignIn(signInPayload);
        expect(status).toBe(200);
      });
    });
  });
});
