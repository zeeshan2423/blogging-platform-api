// Importing core application logic from app.js
import app from './src/app.js';

// Importing the database connection utility
import connectDB from './src/config/db.js';

// Importing dotenv to load environment variables from .env file
import dotenv from 'dotenv';

// Destructuring environment variables from env configuration file
import { NODE_ENV, PORT } from './src/config/env.js';

// Load environment variables into process.env
dotenv.config();

// Set the application port (default to 3000 if not provided)
const SET_PORT = PORT || 3000;

/**
 * Asynchronous function to establish database connection
 * and start the Express server.
 * 
 * This ensures that the application only starts if the database connection is successful,
 * preventing accidental failures after the server is already running.
 */
const startServer = async () => {
  try {
    // Establish connection to the database
    await connectDB();

    // Start the server on the specified port
    app.listen(SET_PORT, () => {
      console.log(`Server running in ${NODE_ENV} mode on http://localhost:${SET_PORT}`);
    });
  } catch (error) {
    // Log the error if server startup fails, and exit the process with failure code (1)
    console.error(`Error starting server: ${error.message}`);
    process.exit(1); // Exit with failure status
  }
};

// Start the server (immediately invoked)
startServer();
