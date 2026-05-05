writing a simple todo list for myself.  Angular frontend and Node.js backend.

## Prerequisites

- Node.js (v18+)
- MySQL (v8+)
- npm

- ## Setup

### 1. Database

Create the MySQL database:

sql
CREATE DATABASE personal_assistant;

### 2. Backend

bash
cd personal-assistant-backend
npm install

Create `.env` file:

env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=personal_assistant
JWT_SECRET=your_random_secret_key

Run:

bash
npm run dev

Backend runs on `http://localhost:3000`

### 3. Frontend

bash
cd personal-assistant-frontend
npm install
npm start

Frontend runs on `http://localhost:4200`

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## Tech Stack

**Backend:** Node.js, Express, TypeScript, MySQL, JWT  
**Frontend:** Angular 21, TypeScript, Tailwind CSS, Lucide Icons

## Troubleshooting

**Database connection error:** Check MySQL is running and credentials in `.env` are correct  
**Port already in use:** Change `PORT` in backend `.env` or kill the process using port 3000

