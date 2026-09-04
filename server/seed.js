// Seeds the database with sample tasks for testing/screenshots.
// Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Task = require("./models/Task");

const sampleTasks = [
  {
    title: "Complete Internship Report",
    description: "Prepare the final internship documentation and appendices",
    status: "In Progress",
    priority: "High",
    category: "Study",
    dueDate: new Date("2026-09-10"),
  },
  {
    title: "Prepare Database Documentation",
    description: "Document the MongoDB schema and relationships",
    status: "Pending",
    priority: "Medium",
    category: "Work",
    dueDate: new Date("2026-09-15"),
  },
  {
    title: "Study React",
    description: "Review hooks, context API, and React Router",
    status: "In Progress",
    priority: "Medium",
    category: "Study",
    dueDate: new Date("2026-09-08"),
  },
  {
    title: "Build REST API",
    description: "Implement CRUD endpoints for the task manager",
    status: "Completed",
    priority: "High",
    category: "Work",
    dueDate: new Date("2026-08-30"),
  },
  {
    title: "Complete FYP Module",
    description: "Finish the pending module for the final year project",
    status: "Pending",
    priority: "High",
    category: "Study",
    dueDate: new Date("2026-09-20"),
  },
  {
    title: "Review JavaScript",
    description: "Revise ES6+ features: async/await, destructuring, promises",
    status: "Completed",
    priority: "Low",
    category: "Study",
    dueDate: new Date("2026-08-25"),
  },
  {
    title: "Grocery Shopping",
    description: "Buy weekly groceries",
    status: "Pending",
    priority: "Low",
    category: "Personal",
    dueDate: new Date("2026-09-06"),
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Task.deleteMany();
    await Task.insertMany(sampleTasks);
    console.log("Sample tasks inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
