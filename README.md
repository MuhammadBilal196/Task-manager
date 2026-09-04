# Task Management System

A full-stack task manager built with **React**, **Node.js/Express**, and **MongoDB Atlas**. Built  project demonstrating end-to-end CRUD, REST API design, and full-stack integration for an internship report.

## Description

This application lets a user create, view, edit, delete, search, filter, and sort tasks, and track progress through a dashboard of live statistics. All task data is stored permanently in MongoDB Atlas — there is no fake or local-only data path. Every action in the React UI goes through the Express REST API to MongoDB and back.

```
React (Vite)  →  Express REST API  →  Mongoose  →  MongoDB Atlas
```

## Technologies

**Frontend:** React 18, React Router, Axios, Vite, HTML5, CSS3
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas, Mongoose
**Tools:** VS Code, Postman/Thunder Client, Git/GitHub

## Features

- Dashboard with live task statistics (total, pending, in progress, completed, high priority)
- Create, read, update, and delete tasks (full CRUD)
- Dedicated status update endpoint (`Pending → In Progress → Completed`)
- Search tasks by title, description, or category
- Filter by status, priority, and category
- Sort by newest, oldest, due date, or priority
- Form validation on both frontend and backend
- Loading states, empty states, and user-friendly error handling
- Delete confirmation dialog
- Fully responsive design (desktop, tablet, mobile)
- Clean service-layer architecture (`taskService.js`) — components never call `axios` directly
- Sample data seed script for testing and screenshots

## Project Architecture

```
task-manager/
├── client/                # React frontend (Vite)
│   └── src/
│       ├── components/    # Navbar, TaskCard, TaskForm, TaskFilter, etc.
│       ├── pages/         # Dashboard, Tasks, AddTask, EditTask, TaskDetail
│       ├── services/      # taskService.js — API layer
│       ├── hooks/         # useDebounce
│       ├── context/       # TaskContext — global state
│       └── styles/        # index.css
│
└── server/                # Express backend
    ├── config/db.js       # MongoDB Atlas connection
    ├── models/Task.js     # Mongoose schema
    ├── controllers/       # Route handler logic
    ├── routes/             # REST route definitions
    ├── middleware/         # 404 + centralized error handler
    ├── seed.js             # Sample data loader
    └── server.js           # App entry point
```

## Installation

Clone or download the project, then install dependencies for each half separately.

### Backend

```bash
cd server
npm install
cp .env.example .env
```

### Frontend

```bash
cd client
npm install
cp .env.example .env
```

## Environment Variables

**server/.env**
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Get `MONGO_URI` from your MongoDB Atlas cluster: Database → Connect → Drivers, then paste the connection string and add your database name (e.g. `task_manager`) before the query string. Never commit `.env` — it's already listed in `.gitignore`.

## Running the Application

Start the backend and frontend in two separate terminals.

**Backend** (runs on `http://localhost:5000`)
```bash
cd server
npm run dev
```

**Frontend** (runs on `http://localhost:5173`)
```bash
cd client
npm run dev
```

You should see `MongoDB Connected Successfully` and `Server running on port 5000` in the backend terminal.

### Optional: load sample data

```bash
cd server
npm run seed
```

This clears the `tasks` collection and inserts several sample tasks with varied statuses, priorities, and categories — useful for screenshots.

## API Endpoints

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| GET    | `/api/tasks`               | Get all tasks (supports `?search=&status=&priority=&category=&sort=`) |
| GET    | `/api/tasks/stats`         | Get dashboard statistics              |
| GET    | `/api/tasks/:id`           | Get a single task                     |
| POST   | `/api/tasks`                | Create a new task                     |
| PUT    | `/api/tasks/:id`            | Update a task                         |
| PATCH  | `/api/tasks/:id/status`     | Update only a task's status           |
| DELETE | `/api/tasks/:id`            | Delete a task                         |

### Example: create a task

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete internship report",
  "description": "Prepare the final internship documentation",
  "status": "Pending",
  "priority": "High",
  "category": "Study",
  "dueDate": "2026-09-10"
}
```

Response:
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": { "_id": "...", "title": "Complete internship report", "...": "..." }
}
```

### Example: update status

```http
PATCH /api/tasks/:id/status
Content-Type: application/json

{ "status": "Completed" }
```

### Testing with Postman / Thunder Client

Import the endpoints above into a new collection. For each, verify:
1. A `200`/`201` response with `success: true` on valid input
2. A `400` response with a validation message on bad input (e.g. missing title)
3. A `404` response for a non-existent or malformed ID
4. That the change is reflected in MongoDB Atlas immediately after the request

## Proof-of-Work Screenshot Checklist

**Backend (Appendix F)**
- [ ] `server/` folder structure
- [ ] `server.js` and `config/db.js`
- [ ] `models/Task.js`
- [ ] `routes/taskRoutes.js` and `controllers/taskController.js`
- [ ] Postman: GET, POST, PUT, PATCH, DELETE requests with JSON responses

**Database (Appendix G)**
- [ ] MongoDB Atlas dashboard and cluster
- [ ] `task_manager` database and `tasks` collection
- [ ] Task documents before/after a POST, PUT, and DELETE

**Full Application (Appendix H)**
- [ ] Dashboard with statistics
- [ ] Task list / task cards
- [ ] Add Task form and the newly created task
- [ ] Edit Task screen and the updated task
- [ ] Search and filtering in action
- [ ] Marking a task complete
- [ ] Delete confirmation dialog
- [ ] Mobile/responsive view

## Final Quality Checklist

- [x] React and Express start independently on ports 5173 and 5000
- [x] MongoDB Atlas connects successfully
- [x] All CRUD + status endpoints work end-to-end
- [x] Search, filter, and sort work from the UI
- [x] Frontend and backend validation in place
- [x] Loading, empty, and error states implemented
- [x] Responsive down to mobile
- [x] `.env` excluded from git, `.env.example` provided
- [x] No task data stored only in localStorage — MongoDB is the source of truth

## Changelog

- Added new tasks through the running application and verified they persist correctly in MongoDB.
