const router = require("express").Router();
const authController = require("./auth.controller");
router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signUp);
router.delete("/auth/logout", authController.logout);

module.exports = router;
