# 🏫 School Attendance Biometric System API

## Overview
This is a robust backend API for a school attendance system, leveraging Node.js with Express.js for building RESTful services and Mongoose as an ODM for MongoDB. It provides functionalities for student registration, secure authentication using JSON Web Tokens (JWT), and access to student-specific dashboard data.

## Features
- **Node.js**: Asynchronous JavaScript runtime for efficient server-side operations.
- **Express.js**: Fast, unopinionated, minimalist web framework for building the API.
- **Mongoose**: Elegant MongoDB object modeling for Node.js, managing data schemas and interactions.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **JSON Web Tokens (JWT)**: Secure, stateless authentication mechanism for API requests.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Cookie-parser**: Middleware for parsing and managing cookies.
- **Dotenv**: Environment variable management for secure configuration.

## Getting Started

### Installation
To get this project up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mimisax-pixel/school-attendance-biometric-system.git
    ```
2.  **Navigate to the Backend Directory**:
    ```bash
    cd school-attendance-biometric-system/backend
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the `backend` directory and add the following environment variables:

-   `PORT`: The port number on which the server will run.
    -   `Example`: `PORT=5000`
-   `DB_CONNECTION_STRING`: Your MongoDB connection string.
    -   `Example`: `DB_CONNECTION_STRING=mongodb://localhost:27017/attendance_db`
-   `JWT_SECRET`: A secret key used for signing and verifying JWTs.
    -   `Example`: `JWT_SECRET=supersecretkeythatisatleast32characterslong`

## API Documentation

### Base URL
`/api/v1`

### Endpoints

#### POST /api/v1/register/student
Registers a new student in the system.

**Request**:
```json
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "09012345678",
  "department": "Computer Science",
  "level": "200",
  "matricNumber": "CST/20/0001",
  "password": "securePassword123",
  "biometricData": "fingerprint_hash_string_example"
}
```
**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "65b7d9e2a4f0b2c1d3e4f5a6",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```
**Errors**:
-   `400 Bad Request`: All fields are required (if `email`, `phone`, `password`, `department`, `level`, `matricNumber` are missing).
-   `400 Bad Request`: Student with provided email, phone, matric number, or biometric data already exists.
-   `500 Internal Server Error`: Server error during registration.

#### POST /api/v1/login/student
Authenticates a student and issues a JWT token as a cookie.

**Request**:
```json
{
  "matricNumber": "CST/20/0001",
  "password": "securePassword123"
}
```
*Note: `matricNumber` can also be the student's email or phone number.*

**Response**:
```json
{
  "message": "Login successful",
  "student": {
    "id": "65b7d9e2a4f0b2c1d3e4f5a6",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```
*A `token` cookie will be set in the response headers.*

**Errors**:
-   `400 Bad Request`: matricnumber and password are required.
-   `404 Not Found`: Student not found.
-   `401 Unauthorized`: Invalid password.
-   `500 Internal Server Error`: Server error during login.

#### POST /api/v1/auth/student/check
Checks if the current session is authenticated based on the presence and validity of the JWT token cookie.

**Request**:
*(Requires a valid `token` cookie to be sent with the request)*
*(No request body needed)*

**Response**:
```json
{
  "message": "Authenticated",
  "isauthenticated": true
}
```
**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.

#### GET /api/v1/student/dashboard
Retrieves the authenticated student's dashboard data, excluding sensitive information like password and biometric data.

**Request**:
*(Requires a valid `token` cookie to be sent with the request)*
*(No request body needed)*

**Response**:
```json
{
  "student": {
    "_id": "65b7d9e2a4f0b2c1d3e4f5a6",
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09012345678",
    "department": "Computer Science",
    "level": "200",
    "matricNumber": "CST/20/0001",
    "courses": [],
    "programmes": [],
    "attendance": [],
    "grades": [],
    "createdAt": "2024-01-29T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `404 Not Found`: Student data not found.
-   `500 Internal Server Error`: Server error.

---

## Usage
Once the server is running, you can interact with the API endpoints using tools like Postman, Insomnia, or cURL.

1.  **Start the Server**:
    To run the server in development mode (with `nodemon` for auto-restarts):
    ```bash
    npm run dev
    ```
    Or, for a production-like environment:
    ```bash
    npm start
    ```
    The server will typically run on `http://localhost:5000` (or your configured `PORT`).

2.  **Register a Student**:
    Send a `POST` request to `http://localhost:5000/api/v1/register/student` with the required student data in the request body (as shown in the API documentation).

3.  **Log In a Student**:
    Send a `POST` request to `http://localhost:5000/api/v1/login/student` with the student's credentials. Upon successful login, the server will set an `httpOnly` cookie named `token` in your client's browser (or HTTP client).

4.  **Access Protected Routes**:
    For endpoints like `/api/v1/student/dashboard` or `/api/v1/auth/student/check`, ensure that the `token` cookie obtained during login is sent with subsequent requests. Most HTTP clients/browsers handle cookies automatically.

## Technologies Used

| Technology         | Description                                                                     | Link                                                              |
| :----------------- | :------------------------------------------------------------------------------ | :---------------------------------------------------------------- |
| **Node.js**        | JavaScript runtime built on Chrome's V8 JavaScript engine.                      | [https://nodejs.org/](https://nodejs.org/)                        |
| **Express.js**     | A minimalist web framework for Node.js.                                         | [https://expressjs.com/](https://expressjs.com/)                  |
| **Mongoose**       | MongoDB object modeling tool designed to work in an asynchronous environment.   | [https://mongoosejs.com/](https://mongoosejs.com/)                |
| **MongoDB**        | A document-oriented NoSQL database.                                             | [https://www.mongodb.com/](https://www.mongodb.com/)              |
| **JSON Web Token** | An open standard for securely transmitting information between parties as a JSON object. | [https://jwt.io/](https://jwt.io/)                                |
| **CORS**           | Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. | [https://www.npmjs.com/package/cors](https://www.npmjs.com/package/cors) |
| **Dotenv**         | Loads environment variables from a `.env` file.                                 | [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |

## License
This project is developed under standard copyright. For licensing details, please contact the author.

## Author Info
**Mimisax-pixel**

-   LinkedIn: [@mimisax-pixel](https://www.linkedin.com/in/mimisax-pixel) *(Placeholder, replace with actual link)*
-   Twitter: [@mimisax-pixel_dev](https://twitter.com/mimisax-pixel_dev) *(Placeholder, replace with actual link)*

---

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red?style=flat-square&logo=mongoose)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square&logo=json-web-tokens)](https://jwt.io/)
[![License: Custom](https://img.shields.io/badge/License-Custom-lightgrey.svg)](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)