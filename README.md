# 📋 Todo Web App - Full Stack

A task management application where users can create boards, add todos, and perform CRUD operations.

## Features

- **Authentication**: Signup and Login with email/password using JWT
- **Board Management**: Create, Read, Update, Delete boards
- **Todo Management**: Create, Read, Update, Delete todos within boards
- **Task Tracking**: Mark todos as complete/incomplete
- **Secure**: Passwords hashed with bcryptjs, JWT token-based auth

##  Tech Stack

Frontend  :-  React
Backend   :-  Node.js, Express.js                   
Database  :-  MongoDB                               
Authentication :- JWT (JSON Web Tokens)                 


##  Project Structure

Human AI/
├── server/
│   ├── config/
│   │   ├── db.js 
│   ├── controllers/
│   │   ├── authController.js 
│   │   ├── boardController.js 
│   │   └── todoController.js 
│   ├── models/
│   │   ├── User.js 
│   │   ├── Board.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── boardRoutes.js
│   │   └── todoRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js 
│   ├── server.js
│   └── .env
│
└── client/
    ├── src/
    │   ├── api/
    │   │   └── axios.js 
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   └── Dashboard.js
    │   ├── components/
    │   │   ├── BoardList.js
    │   │   ├── TodoList.js
    │   │   └── TodoItem.js
    │   ├── App.js (Routing)
    │   └── index.js
    └── package.json


##  Setup Instructions

 Backend Setup

cd server
npm install

# .env file already contains:
# PORT=8301
# MONGO_URI=mongodb connection string
# JWT_SECRET=your secret key

npm start
# Server runs on http://localhost:8301
```

### Frontend Setup

cd client
npm install
npm start
# Frontend runs on http://localhost:3456 


##  API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email & password

### Boards (Protected with JWT)

- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create new board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Todos (Protected with JWT)

- `GET /api/todos/:boardId` - Get todos for board
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

##  How Authentication Works

1. **Signup**: User creates account with email & password
2. **Password**: Hashed using bcryptjs (10 salt rounds)
3. **Login**: Returns JWT token valid for 7 days
4. **Token Storage**: Stored in localStorage
5. **Protected Routes**: All API calls include token in Authorization header
6. **Logout**: Clears token from localStorage

## How to Test

1. **Signup**: Go to signup page, create account with email
2. **Login**: Login with your email & password
3. **Create Board**: Add board name and create
4. **Create Todo**: Select board, add todo with title & description
5. **Edit**: Click edit button to modify board/todo
6. **Delete**: Click delete button to remove
7. **Complete**: Check the checkbox to mark todo complete
8. **Logout**: Click logout to exit

##  Database Models

### User

- email (unique, required)
- password (hashed, required)

### Board

- name (required)
- userId (reference to User)

### Todo

- title (required)
- description
- completed (boolean)
- boardId (reference to Board)
- userId (reference to User)



##  Features Implemented

 User can sign up with email  
 User can log in with credentials  
 User can create multiple boards  
 User can create todos within boards  
 User can edit board names  
 User can edit todo details  
 User can delete boards  
 User can delete todos  
 User can mark todos as complete  
 User can log out  
 Protected routes with JWT authentication  


##  Environment Variables (.env)

```
PORT=8301
MONGO_URI=mongodb connection string
JWT_SECRET=your secret key
```

## 📝 Important Notes

- All passwords are hashed and never stored in plain text
- JWT tokens expire in 7 days
- API requires valid token in Authorization header
- CORS enabled for frontend-backend communication
- MongoDB Atlas used for database
- No hardcoded values - all configuration in .env


