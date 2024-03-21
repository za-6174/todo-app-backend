const { register, login, logout } = require("../Controllers/AuthController");
const { getTasksByUser, updateTask, deleteTask } = require("../Controllers/TaskController");
const { checkUser } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// User Routes
router.post("/", checkUser);
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

// Task Routes
router.get("/tasks/:userId", getTasksByUser);
router.get("/deletetask/:taskId", deleteTask);
router.post("/tasks", updateTask);

module.exports = router;