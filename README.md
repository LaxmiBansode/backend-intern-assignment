# Task Management API - Primetrade.ai Assignment

## What I Built
A task management app with JWT authentication, role-based access (user/admin), and full CRUD operations. Includes React frontend.

## Tech Stack
Node.js, Express, MySQL, JWT, React, Swagger

## Setup Instructions

### Backend
```bash
npm install
npm run dev

Runs on http://localhost:5000

Frontend
cd client
npm install
npm start

Runs on http://localhost:3000

Environment Variables (.env)
PORT=5000
JWT_SECRET=mysecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=assignment_db

API Endpoints
POST /api/auth/register - Register user

POST /api/auth/login - Login (returns JWT)

GET /api/tasks - Get all tasks

POST /api/tasks - Create task

PUT /api/tasks/:id - Update task

DELETE /api/tasks/:id - Delete task

Swagger Docs: http://localhost:5000/api-docs

Testing
Open http://localhost:3000

Register a new user

Login

Create, edit, or delete tasks

Screenshots

