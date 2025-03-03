// Import mongoose to define schema and model
import mongoose from 'mongoose';

/**
 * Post Schema Definition
 * 
 * This schema represents a blog post document in the database.
 * Each post has a title, content, category, and optional tags.
 * Timestamps are automatically added to track creation and updates.
 */
const postSchema = new mongoose.Schema({
  // Title of the post - required and trimmed
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },

  // Main content/body of the post - required
  content: {
    type: String,
    required: [true, 'Content is required']
  },

  // Category under which the post falls - required and trimmed
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },

  // Optional tags array to classify or label the post
  tags: {
    type: [String],
    default: []
  }
}, {
  // Enable automatic timestamps (createdAt & updatedAt)
  timestamps: true,

  // Customize JSON response to modify fields when sending to client
  toJSON: { 
    transform: (doc, ret) => {
      ret.id = ret._id;  // Map _id to id (client-friendly)
      delete ret._id;    // Remove _id (redundant after mapping)
      delete ret.__v;    // Remove internal version key
      return ret;
    }
  }
});

/**
 * Indexing
 * 
 * Create a text index on title, content, and category fields.
 * This allows efficient full-text search queries across these fields.
 */
postSchema.index({ title: 'text', content: 'text', category: 'text' });

// Define and export the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;
