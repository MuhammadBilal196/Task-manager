const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// IMPORTANT: /stats must be declared before /:id so it isn't swallowed by it
router.get("/stats", getTaskStats);

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

router.patch("/:id/status", updateTaskStatus);

module.exports = router;
