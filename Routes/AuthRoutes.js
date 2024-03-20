const { register, login, logout } = require("../Controllers/AuthController");
const { checkUser } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// User Routes
router.post("/", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;