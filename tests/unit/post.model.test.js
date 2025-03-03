import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Post from '../../src/models/post.model.js';

/**
 * In-memory MongoDB Setup for Unit Testing
 * 
 * This file uses `mongodb-memory-server` to provide a temporary in-memory MongoDB instance,
 * allowing isolated and fast model tests without requiring a real database connection.
 * 
 * This ensures tests are deterministic and can run in CI/CD pipelines reliably.
 */

// In-memory MongoDB instance
let mongoServer;

/**
 * Setup: Start MongoMemoryServer and connect mongoose before tests run
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

/**
 * Teardown: Disconnect mongoose and stop the in-memory server after all tests
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

/**
 * Cleanup: Clear all documents from the Post collection after each test
 */
afterEach(async () => {
  await Post.deleteMany();
});

/**
 * Test Suite: Post Model
 * 
 * Covers basic schema validation, creation logic, and schema transformations.
 */
describe('Post Model', () => {
  
  /**
   * Test Case: Successful Post Creation
   * 
   * This test ensures that a valid Post can be created and all required fields
   * are properly stored and returned.
   */
  it('should create a post successfully', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post',
      category: 'Testing',
      tags: ['test', 'unit']
    };
    
    const post = await Post.create(postData);
    
    expect(post.title).toBe(postData.title);
    expect(post.content).toBe(postData.content);
    expect(post.category).toBe(postData.category);
    expect(post.tags).toEqual(expect.arrayContaining(postData.tags));
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });

  /**
   * Test Case: Validation Failure - Missing Required Fields
   * 
   * This test verifies that the schema enforces required fields and rejects incomplete documents.
   */
  it('should fail to create a post without required fields', async () => {
    const postData = {
      title: 'Test Post' // Missing content & category
    };
    
    await expect(Post.create(postData)).rejects.toThrow();
  });

  /**
   * Test Case: Schema Transformation - _id to id
   * 
   * This test ensures that when a Post document is converted to JSON,
   * it follows the expected API response format — replacing `_id` with `id`
   * and removing internal fields like `__v`.
   */
  it('should convert _id to id in JSON response', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post',
      category: 'Testing'
    };
    
    const post = await Post.create(postData);
    const postJson = post.toJSON();
    
    expect(postJson.id).toBeDefined();
    expect(postJson._id).toBeUndefined();
    expect(postJson.__v).toBeUndefined();
  });

});
