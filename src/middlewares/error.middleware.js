// Import environment variable to determine environment context
import { NODE_ENV } from '../config/env.js';

/**
 * Global Error Handler Middleware
 * 
 * This middleware handles all errors that are passed down the middleware chain.
 * It captures errors, ensures a proper HTTP status is set, and returns a consistent error response.
 * 
 * @param {Object} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // If no status has been set before the error, assume 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message, // Send the error message to the client
    stack: NODE_ENV === 'production' ? null : err.stack // Stack trace only in non-production environments
  });
};

/**
 * 404 Not Found Handler Middleware
 * 
 * This middleware handles requests to undefined routes.
 * It creates a 404 error and passes it to the error handler.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFound = (req, res, next) => {
  // Create an error for unhandled routes
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the error handler
};

// Export both middlewares for use in the app
export { errorHandler, notFound };
