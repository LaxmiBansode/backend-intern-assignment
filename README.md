Here's your **complete README.md** — just copy everything below:

---

```markdown
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
```
Runs on http://localhost:5000

### Frontend
```bash
cd client
npm install
npm start
```
Runs on http://localhost:3000

### Environment Variables (.env)
```
PORT=5000
JWT_SECRET=mysecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=assignment_db
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login (returns JWT) |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Swagger Documentation
http://localhost:5000/api-docs

## Testing the Application
1. Open http://localhost:3000
2. Register a new user
3. Login with your credentials
4. Create, edit, or delete tasks

## Screenshots

### Registration
<img width="1919" height="619" alt="image" src="https://github.com/user-attachments/assets/a77c6771-60aa-4bc9-88a6-4851d7f63aae" />





### Password Length Error
<img width="1919" height="666" alt="image" src="https://github.com/user-attachments/assets/93dcedb6-8cc1-4e4f-8bfe-24a7973a30d7" />


### Registration Success
<img width="1919" height="642" alt="image" src="https://github.com/user-attachments/assets/00fbd541-a621-4ade-aa56-65ece4003461" />

### Login
<img width="1919" height="583" alt="image" src="https://github.com/user-attachments/assets/ba4aaaac-4003-445d-be57-f61d96e3deea" />


### Login Success
<img width="1910" height="836" alt="image" src="https://github.com/user-attachments/assets/211d0bbb-0bc6-4d47-8bf1-3e4338220fc8" />


### Dashboard
<img width="1919" height="790" alt="image" src="https://github.com/user-attachments/assets/3952f3cd-f58e-4fba-ad7b-47f19b81da9f" />


### Task Added
<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/dbd546fe-af81-4fdd-8a77-d03fe2711710" />

### Edit Task
<img width="1919" height="802" alt="image" src="https://github.com/user-attachments/assets/bda83e7f-2cce-492f-9466-14659acc03eb" />


### Delete Task
<img width="1908" height="936" alt="image" src="https://github.com/user-attachments/assets/340c4160-77d8-4a46-96af-2d45d39c94b7" />


## Features Completed
- ✅ User registration & login
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access (user/admin)
- ✅ Complete CRUD operations for tasks
- ✅ MySQL database with proper schema
- ✅ React frontend with Axios
- ✅ Swagger API documentation
- ✅ Input validation & error handling

## Time Taken
Completed within the assignment timeline

```
