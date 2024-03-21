const { register, login, logout } = require("../Controllers/AuthController");
const { getTasksByUser, updateTask, deleteTask, markTaskStatus } = require("../Controllers/TaskController");
const { checkUser } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// User Routes
router.post("/", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

// Task Routes
router.get("/tasks/:userId", getTasksByUser);
router.post("/deletetask", deleteTask);
router.post("/tasks", updateTask);
router.post("/marktask", markTaskStatus)

module.exports = router;