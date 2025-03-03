# **Blog API**

A RESTful API for a personal blogging platform with CRUD operations built using Node.js, Express, and MongoDB.

🔗 **Project URL:** [Blogging Platform API Project on Roadmap.sh](https://roadmap.sh/projects/blogging-platform-api)

## **Features**

- Create, read, update, and delete blog posts
- Search functionality for blog posts
- Unit and integration tests using Jest
- RESTful API design

## **Requirements**

- Node.js 14+
- MongoDB
- npm or yarn

## **Installation**

1. Clone the repository:

   ```
   git clone <repository-url>
   cd blog-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=<your_mongodb_url_here>
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

## **API Endpoints**

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| POST   | /api/posts              | Create a new blog post       |
| GET    | /api/posts              | Get all blog posts           |
| GET    | /api/posts?term=keyword | Search blog posts            |
| GET    | /api/posts/:id          | Get a single blog post by ID |
| PUT    | /api/posts/:id          | Update a blog post           |
| DELETE | /api/posts/:id          | Delete a blog post           |

## **Testing**

Run all tests:

```
npm test
```

Run unit tests:

```
npm run test:unit
```

Run integration tests:

```
npm run test:integration
```

Example test output:
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|---------------------------------
All files | 84.44 | 72.22 | 77.77 | 84.44 |  
 src | 81.81 | 50 | 0 | 81.81 |  
 app.js | 81.81 | 50 | 0 | 81.81 | 33,47  
 src/config | 100 | 50 | 100 | 100 |  
 env.js | 100 | 50 | 100 | 100 | 12  
 src/controllers | 85 | 78.57 | 100 | 85 |  
 post.controller.js | 85 | 78.57 | 100 | 85 | 59,81-82,99-100,124-125,153-154
src/middlewares | 57.14 | 50 | 50 | 57.14 |  
 error.middleware.js | 57.14 | 50 | 50 | 57.14 | 37-39  
 src/models | 100 | 100 | 100 | 100 |  
 post.model.js | 100 | 100 | 100 | 100 |  
 src/routes | 100 | 100 | 100 | 100 |  
 post.routes.js | 100 | 100 | 100 | 100 |

Test Suites: 2 passed, 2 total

Tests: 13 passed, 13 total

Snapshots: 0 total

Time: 1.762 s, estimated 2 s

Ran all test suites.

## **Project Structure**

```
blog-api/
├── server.js             # Server entry point
├── src/                      # Source code
│   ├── app.js                # Express app setup
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   └── utils/                # Utility functions
└── tests/                    # Test files
    ├── unit/                 # Unit tests
    └── integration/          # Integration tests
```

---

## 👨‍💻 **Contributing**

Contributions are welcome! Feel free to open issues and submit pull requests.

## **Author** ✨

👨‍💻 Developed by **Mohammad Zeeshan Khan**  
📧 Contact: zeeshan2423@gmail.com
