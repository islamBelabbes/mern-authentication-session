const router = require("express").Router();
const userController = require("./user.controller");
const isAuth = require("../../../middleware/authMiddleware");
router.get("/user/me", userController.getCurrentUser);
router.get("/users/", isAuth(["admin"]), userController.getAllUsers);

module.exports = router;
