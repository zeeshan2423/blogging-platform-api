// Import dotenv to load environment variables from .env files
import { config } from "dotenv";

/**
 * Load environment variables dynamically based on NODE_ENV.
 * 
 * This approach allows different environment configurations (development, production, etc.)
 * by loading `.env.{NODE_ENV}.local` file if present.
 * 
 * Defaults to `development` if NODE_ENV is not set.
 */
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

/**
 * Export key environment variables for use across the application.
 * 
 * Centralizing this makes it easier to manage and validate env variables,
 * and simplifies future additions if needed.
 */
export const {
  PORT,        // Port on which the server will run
  NODE_ENV,    // Current environment (development, production, etc.)
  MONGODB_URI  // Connection string for MongoDB database
} = process.env;
