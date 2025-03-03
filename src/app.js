// Import required modules and packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import route handlers
import postRoutes from './routes/post.routes.js';

// Import custom error handling middlewares
import { errorHandler, notFound } from './middlewares/error.middleware.js';

// Load environment variables from .env file into process.env
dotenv.config();

// Initialize the Express application instance
const app = express();

/* 
 * =====================
 * Global Middleware Setup
 * =====================
 */

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// Parse incoming JSON requests into JavaScript objects
app.use(express.json());

// Enable request logging in development mode for better debugging and monitoring
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* 
 * =====================
 * Route Handlers
 * =====================
 */

// Mount post-related routes under /api/v1/posts
app.use('/api/v1/posts', postRoutes);

// Health check / base route - confirms API is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

/* 
 * =====================
 * Error Handling Middleware
 * =====================
 * These will handle routes that do not exist and any other
 * errors that occur during request processing.
 */

// Handle 404 - Route Not Found
app.use(notFound);

// Centralized error handler for internal server errors and other exceptions
app.use(errorHandler);

// Export the configured Express app to be used in server.js (entry point)
export default app;
