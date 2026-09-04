const mongoose = require("mongoose");

/**
 * Connects to MongoDB Atlas using the connection string
 * provided in the MONGO_URI environment variable.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure if the DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
