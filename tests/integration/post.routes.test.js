import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app.js';
import Post from '../../src/models/post.model.js';

/**
 * Integration Test: Post Routes
 * 
 * This file tests the complete lifecycle of `Post` entity via HTTP requests,
 * covering CRUD operations and search filtering using the actual Express app instance.
 * 
 * Database: Uses `mongodb-memory-server` for an isolated and ephemeral test database.
 */

// In-memory MongoDB server instance
let mongoServer;

/**
 * Global Setup: Start in-memory MongoDB and connect Mongoose before tests run.
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

/**
 * Global Teardown: Disconnect mongoose and stop in-memory MongoDB after all tests.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

/**
 * Cleanup after each test to ensure a clean slate (removes all posts).
 */
afterEach(async () => {
  await Post.deleteMany();
});

// Reusable sample data for posts
const samplePost = {
  title: 'Test Post',
  content: 'This is a test post',
  category: 'Testing',
  tags: ['test', 'api']
};

/**
 * Test Suite: Post Routes (API Endpoints)
 */
describe('Post Routes', () => {
  
  /**
   * Test: POST /api/v1/posts
   * - Verifies successful post creation
   * - Checks validation failure when required fields are missing
   */
  describe('POST /api/v1/posts', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/api/v1/posts')
        .send(samplePost);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(samplePost.title);
      expect(res.body.id).toBeDefined(); // Ensure transformed `id` is present
    });
    
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/posts')
        .send({ title: 'Missing Fields' }); // Missing content & category
      
      expect(res.statusCode).toBe(400);
    });
  });

  /**
   * Test: GET /api/v1/posts
   * - Verifies retrieval of all posts
   * - Checks filtering based on search term
   */
  describe('GET /api/v1/posts', () => {
    it('should get all posts', async () => {
      await Post.create(samplePost);
      await Post.create({ ...samplePost, title: 'Another Test Post' });
      
      const res = await request(app).get('/api/v1/posts');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
    
    it('should filter posts by search term', async () => {
      await Post.create(samplePost);
      await Post.create({
        title: 'Programming Blog',
        content: 'Content about programming',
        category: 'Development',
        tags: ['programming', 'code']
      });
      
      const res = await request(app).get('/api/v1/posts?term=programming');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Programming Blog');
    });
  });

  /**
   * Test: GET /api/v1/posts/:id
   * - Fetches a post by its ID
   * - Validates 404 response for non-existing ID
   */
  describe('GET /api/v1/posts/:id', () => {
    it('should get a post by id', async () => {
      const post = await Post.create(samplePost);
      
      const res = await request(app).get(`/api/v1/posts/${post._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(samplePost.title);
    });
    
    it('should return 404 if post not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/v1/posts/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
    });
  });

  /**
   * Test: PUT /api/v1/posts/:id
   * - Updates an existing post
   * - Validates 404 for non-existing post
   */
  describe('PUT /api/v1/posts/:id', () => {
    it('should update a post', async () => {
      const post = await Post.create(samplePost);
      
      const updatedData = {
        ...samplePost,
        title: 'Updated Title'
      };
      
      const res = await request(app)
        .put(`/api/v1/posts/${post._id}`)
        .send(updatedData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });
    
    it('should return 404 if post not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/v1/posts/${fakeId}`)
        .send(samplePost);
      
      expect(res.statusCode).toBe(404);
    });
  });

  /**
   * Test: DELETE /api/v1/posts/:id
   * - Deletes a post by ID
   * - Validates 404 for non-existing post
   */
  describe('DELETE /api/v1/posts/:id', () => {
    it('should delete a post', async () => {
      const post = await Post.create(samplePost);
      
      const res = await request(app).delete(`/api/v1/posts/${post._id}`);
      
      expect(res.statusCode).toBe(204);
      
      // Ensure it's actually gone
      const findPost = await Post.findById(post._id);
      expect(findPost).toBeNull();
    });
    
    it('should return 404 if post not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/v1/posts/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
    });
  });

});
