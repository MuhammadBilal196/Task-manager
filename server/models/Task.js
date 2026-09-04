const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "In Progress", "Completed"],
        message: "Status must be Pending, In Progress, or Completed",
      },
      default: "Pending",
      required: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Priority must be Low, Medium, or High",
      },
      default: "Medium",
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: ["Work", "Study", "Personal", "Other"],
        message: "Category must be Work, Study, Personal, or Other",
      },
      default: "Other",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Helpful indexes for search/sort/filter performance
TaskSchema.index({ title: "text", description: "text", category: "text" });
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ dueDate: 1 });

module.exports = mongoose.model("Task", TaskSchema);
