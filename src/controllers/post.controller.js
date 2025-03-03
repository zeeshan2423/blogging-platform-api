// Import Post model to interact with the posts collection in the database
import Post from '../models/post.model.js';

/**
 * @desc    Create a new post
 * @route   POST /api/v1/posts
 * @access  Public
 */
export const createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;

    // Basic field validation - required fields check
    if (!title || !content || !category) {
      res.status(400);
      throw new Error('Please provide title, content, and category');
    }

    // Create new post document
    const post = await Post.create({
      title,
      content,
      category,
      tags: tags || [] // Default to empty array if tags are not provided
    });

    // Return created post with 201 Created status
    res.status(201).json(post);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

/**
 * @desc    Fetch all posts (supports optional search by term)
 * @route   GET /api/v1/posts
 * @access  Public
 */
export const getPosts = async (req, res, next) => {
  try {
    let query = {};

    // If search term is provided, build a text search query
    if (req.query.term) {
      query = {
        $or: [
          { title: { $regex: req.query.term, $options: 'i' } },
          { content: { $regex: req.query.term, $options: 'i' } },
          { category: { $regex: req.query.term, $options: 'i' } }
        ]
      };
    }

    // Fetch posts matching the query (sorted by creation date - newest first)
    const posts = await Post.find(query).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single post by ID
 * @route   GET /api/v1/posts/:id
 * @access  Public
 */
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.status(200).json(post);
  } catch (error) {
    // Special handling for invalid ObjectId format
    if (error.kind === 'ObjectId') {
      res.status(404);
      return next(new Error('Post not found'));
    }
    next(error);
  }
};

/**
 * @desc    Update an existing post
 * @route   PUT /api/v1/posts/:id
 * @access  Public
 */
export const updatePost = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;

    // Basic validation to ensure required fields are present
    if (!title || !content || !category) {
      res.status(400);
      throw new Error('Please provide title, content, and category');
    }

    // Fetch the existing post by ID
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Update post fields
    post.title = title;
    post.content = content;
    post.category = category;
    post.tags = tags || [];

    // Save and return the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    // Handle invalid ObjectId (malformed ID) case
    if (error.kind === 'ObjectId') {
      res.status(404);
      return next(new Error('Post not found'));
    }
    next(error);
  }
};

/**
 * @desc    Delete a post by ID
 * @route   DELETE /api/v1/posts/:id
 * @access  Public
 */
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Delete the post document
    await post.deleteOne();

    // Respond with 204 No Content (deletion successful, no response body)
    res.status(204).json({});
  } catch (error) {
    // Handle invalid ObjectId case
    if (error.kind === 'ObjectId') {
      res.status(404);
      return next(new Error('Post not found'));
    }
    next(error);
  }
};
