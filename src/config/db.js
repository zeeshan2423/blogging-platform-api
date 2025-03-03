// Import mongoose for MongoDB connection management
import mongoose from "mongoose";

// Import database connection string from environment configuration
import { MONGODB_URI } from "./env.js";

/**
 * Establish connection to MongoDB
 * 
 * This utility function is responsible for connecting the application to the MongoDB database.
 * It ensures the application exits gracefully if the connection fails.
 * 
 * @returns {Promise<mongoose.Connection>} - The active database connection
 */
const connectDB = async () => {
  try {
    // Attempt to connect using MONGODB_URI from environment
    const conn = await mongoose.connect(MONGODB_URI);

    // Log successful connection (helpful in development and debugging)
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    // Log error and terminate process if connection fails
    console.error(`Error connecting to MongoDB: ${error.message}`);

    // Exit process with failure code
    process.exit(1);
  }
};

// Export the connection function for use in the server initialization
export default connectDB;
