const Task = require("../models/Task");

// @desc    Get all tasks (supports search, filter, sort via query params)
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, category, sort } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") query.status = status;
    if (priority && priority !== "All") query.priority = priority;
    if (category && category !== "All") query.category = category;

    let sortOption = { createdAt: -1 }; // Newest first by default
    if (sort === "oldest") sortOption = { createdAt: 1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };
    else if (sort === "dueDate") sortOption = { dueDate: 1 };
    else if (sort === "priority") {
      // Custom priority order isn't native to Mongo sort, so handle after fetch
      const tasks = await Task.find(query);
      const order = { High: 0, Medium: 1, Low: 2 };
      tasks.sort((a, b) => order[a.priority] - order[b.priority]);
      return res.status(200).json({ success: true, count: tasks.length, tasks });
    }

    const tasks = await Task.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics for the dashboard
// @route   GET /api/tasks/stats
// @access  Public
const getTaskStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: "Pending" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const completed = await Task.countDocuments({ status: "Completed" });
    const highPriority = await Task.countDocuments({ priority: "High" });

    res.status(200).json({
      success: true,
      stats: { total, pending, inProgress, completed, highPriority },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, category, dueDate } = req.body;

    if (!title || !title.trim()) {
      res.status(400);
      throw new Error("Task title is required");
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      category,
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const { title, description, status, priority, category, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update only the status of a task
// @route   PATCH /api/tasks/:id/status
// @access  Public
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (!status || !validStatuses.includes(status)) {
      res.status(400);
      throw new Error("A valid status (Pending, In Progress, Completed) is required");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    task.status = status;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
