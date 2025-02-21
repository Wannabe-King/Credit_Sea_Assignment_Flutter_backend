# Backend API - Loan Application & User Management

## Overview
This backend is built with **Node.js**, **Express**, and **MongoDB** to handle user authentication, loan applications, and user detail management. It provides secure endpoints with JWT-based authentication and robust error handling.

## Features
- User Registration & Authentication
- Update User Details
- Create & Manage Loan Applications
- JWT Authentication Middleware
- MongoDB Integration with Mongoose

## Folder Structure
```
├── models
│   ├── user.js        # User schema and model
│   └── loan.js        # Loan schema and model
├── routes
│   ├── auth.js        # Authentication and user routes
│   └── loan.js        # Loan application routes
├── server.js         # Express server setup
├── .env              # Environment variables (MONGO_URI, JWT_SECRET, etc.)
└── package.json      # Project dependencies and scripts
```

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the server:**
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production mode
   ```

## API Endpoints
### Authentication Routes (`/api/auth`)
- **POST** `/register` - Register a new user  
- **POST** `/login` - Login and get JWT token  
- **PUT** `/update/:phoneNumber` - Update user details *(Requires JWT)*

#### Update User Details Example:
```http
PUT /api/auth/update/1234567890
Headers: { "Authorization": "Bearer <token>" }
Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "Male",
  "maritialStatus": "Single",
  "dob": "1990-01-01",
  "otp": "123456",
  "email": "john@example.com",
  "pan": "ABCDE1234F"
}
```

---
### Loan Routes (`/api/loan`)
- **POST** `/create` - Create a loan application *(Requires JWT)*
- **PUT** `/update-status/:id` - Update loan application status *(Requires JWT)*

#### Create Loan Application Example:
```http
POST /api/loan/create
Headers: { "Authorization": "Bearer <token>" }
Body:
{
  "principal": 50000,
  "tenure": 12,
  "purpose": "Home Renovation",
  "totalAmount": 55000
}
```
Response:
```json
{
  "message": "Loan application created",
  "loan": {
    "_id": "<loan_id>",
    "principal": 50000,
    "tenure": 12,
    "purpose": "Home Renovation",
    "totalAmount": 55000,
    "applicationStatus": "Pending",
    "userId": "<user_id>",
    "createdAt": "<timestamp>"
  }
}
```

---
## Technologies Used
- **Node.js** & **Express** - Server-side development  
- **MongoDB** & **Mongoose** - Database and ORM  
- **JWT** - Authentication  
- **dotenv** - Environment variable management  
- **CORS** - Cross-origin request handling  

## License
This project is for educational purposes only.
