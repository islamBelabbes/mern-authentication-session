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

const adminUser = {
  email: "admin@admin.com",
  password: "password",
  phone: "",
  isAdmin: true,
};

const nonAdminUser = {
  email: "user@user.com",
  password: "user",
  phone: "",
  isAdmin: false,
};

describe("User", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    testSession = session(app);
    await preformSignup(adminUser);
    await preformSignup(nonAdminUser);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await redisClient.quit();
  });

  // Current User
  describe("@GET /api/v1/user/me", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { status } = await testSession.get("/api/v1/user/me");
        expect(status).toBe(401);
      });
    });

    describe("user is logged in", () => {
      it("should return 200", async () => {
        await preformSignIn(nonAdminUser);
        const { status } = await testSession.get("/api/v1/user/me");
        expect(status).toBe(200);
      });
    });
  });

  // All users
  describe("@GET /api/v1/users/", () => {
    beforeEach(async () => {
      await preformSignOut();
    });

    describe("not loggedIn", () => {
      it("should return 401", async () => {
        const { status } = await testSession.get("/api/v1/users/");
        expect(status).toBe(401);
      });
    });

    describe("is admin", () => {
      it("should return 200", async () => {
        await preformSignIn(adminUser);
        const { status } = await testSession.get("/api/v1/users/");
        expect(status).toBe(200);
      });
    });

    describe("is not admin", () => {
      it("should return 403", async () => {
        await preformSignIn(nonAdminUser);
        const { status } = await testSession.get("/api/v1/users/");
        expect(status).toBe(403);
      });
    });
  });
});
