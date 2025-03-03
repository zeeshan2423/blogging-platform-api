// Import Express to create router instance
import express from 'express';

// Import controller functions to handle post-related requests
import { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/post.controller.js';

// Initialize a new router instance
const router = express.Router();

/**
 * ========================
 * Route Definitions
 * ========================
 * 
 * All routes here are prefixed with /api/v1/posts (in app.js).
 * This file only defines the sub-paths under that base path.
 */

/**
 * @route   GET /api/v1/posts
 * @desc    Fetch all posts
 * @access  Public
 *
 * @route   POST /api/v1/posts
 * @desc    Create a new post
 * @access  Public
 */
router.route('/')
  .get(getPosts)
  .post(createPost);

/**
 * @route   GET /api/v1/posts/:id
 * @desc    Fetch single post by ID
 * @access  Public
 * 
 * @route   PUT /api/v1/posts/:id
 * @desc    Update an existing post by ID
 * @access  Public
 * 
 * @route   DELETE /api/v1/posts/:id
 * @desc    Delete a post by ID
 * @access  Public
 */
router.route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

// Export the configured router for use in app.js
export default router;
