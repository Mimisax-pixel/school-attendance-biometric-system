# School Attendance Biometric System Backend API

## Overview
This project is a robust backend API for a school attendance system, leveraging **Node.js** with the **Express.js** framework and **Mongoose** for seamless interaction with a **MongoDB** database. It provides comprehensive functionalities for student, lecturer, and administrator management, including authentication, dashboard analytics, and course management.

## Features
- **Authentication & Authorization**: Secure JWT-based authentication for students, lecturers, and administrators with role-based access control.
- **Student Management**: Register, login, and view personal dashboard data for students.
- **Lecturer Management**: Register lecturers (by admin) and enable lecturer login.
- **Admin Panel**: Centralized dashboard for administrators to view system statistics, manage student records, add/edit/delete courses, and register lecturers.
- **Course Management**: CRUD operations for courses, including details like title, code, department, credit units, and assigned lecturers.
- **Student Records**: Admin access to student attendance records with filtering options by ID, department, and level.
- **Biometric Integration**: Placeholder for biometric data during student registration, designed for future biometric authentication.
- **Data Persistence**: Utilizes MongoDB for efficient and scalable data storage.

## Getting Started

### Installation
To get this project up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mimisax-pixel/school-attendance-biometric-system.git
    cd school-attendance-biometric-system/backend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables**: Create a `.env` file in the `backend` directory.

### Environment Variables
A `.env` file is required in the `backend` directory to store sensitive information and configuration settings.

*   `PORT`: The port number the server will listen on.
    *   Example: `PORT=5000`
*   `DB_CONNECTION_STRING`: Your MongoDB connection URI.
    *   Example: `DB_CONNECTION_STRING=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
*   `JWT_SECRET`: A strong, secret key used for signing JSON Web Tokens.
    *   Example: `JWT_SECRET=your_super_secret_jwt_key_here`

### Running the Application
To start the server, you can use one of the following commands:

*   **Development Mode (with Nodemon for auto-restarts)**:
    ```bash
    npm run dev
    ```
*   **Production Mode**:
    ```bash
    npm start
    ```

The API will be accessible at `http://localhost:PORT/api/v1` (where `PORT` is the value specified in your `.env` file).

## Usage
Once the server is running, you can interact with the API using a tool like Postman, Insomnia, or by integrating it with a frontend application. Below are examples of how to interact with some of the key endpoints.

### Student Registration
To register a new student, send a `POST` request to the student registration endpoint with the required student details in the request body.

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "+2348011223344",
  "department": "Computer Science",
  "level": "300",
  "matricNumber": "CS300123",
  "password": "securepassword",
  "biometricData": "biometric_sample_data_jane"
}' http://localhost:5000/api/v1/register/student
```

### Admin Login
For an administrator to log in, a `POST` request is sent with their credentials. Upon successful login, an HTTP-only cookie containing a JWT is set.

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "admin@example.com",
  "password": "admin123"
}' http://localhost:5000/api/v1/login/admin
```

### Accessing Student Dashboard (Authenticated)
After a student logs in and receives an authentication token (cookie), they can access their dashboard data with a `GET` request. Ensure your client sends the cookie with the request.

```bash
curl -X GET -b "token=your_jwt_token_here" http://localhost:5000/api/v1/auth/student/dashboard
```
Replace `your_jwt_token_here` with the actual token received in the `token` cookie after a successful login.

## API Documentation

### Base URL
`http://localhost:5000/api/v1` (replace `5000` with your configured `PORT`)

### Endpoints

#### POST /register/student
Registers a new student.
**Request**:
```json
{
  "fullname": "String",
  "email": "String",
  "phone": "String",
  "department": "String",
  "level": "String",
  "matricNumber": "String",
  "password": "String (optional, defaults to 'password123')",
  "biometricData": "String (optional, defaults to 'biometric_placeholder' + email)"
}
```
**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "String (ObjectId)",
    "name": "String",
    "email": "String"
  }
}
```
**Errors**:
- `400 Bad Request`: Missing required fields (email, phone, department, level, matricNumber) or student with provided email, phone, matric number, or biometric data already exists.
- `500 Internal Server Error`: Server error during registration.

#### POST /login/student
Authenticates a student and sets a JWT cookie.
**Request**:
```json
{
  "matricNumber": "String (can be email, phone, or matric number)",
  "password": "String"
}
```
**Response**:
```json
{
  "message": "Login successful",
  "student": {
    "id": "String (ObjectId)",
    "name": "String",
    "email": "String"
  },
  "role": "student"
}
```
**Errors**:
- `400 Bad Request`: Matric number and password are required.
- `401 Unauthorized`: Invalid password.
- `404 Not Found`: Student not found.
- `500 Internal Server Error`: Server error during login.

#### GET /auth/check
Checks if the user is authenticated based on the JWT cookie.
**Request**: (Requires `token` cookie)
(No payload)
**Response**:
```json
{
  "status": "success",
  "message": "Authenticated",
  "isauthenticated": true
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.

#### GET /auth/student/dashboard
Retrieves dashboard data for the authenticated student.
**Request**: (Requires `token` cookie with `role: "student"`)
(No payload)
**Response**:
```json
{
  "status": "success",
  "student": {
    "_id": "String (ObjectId)",
    "fullname": "String",
    "email": "String",
    "phone": "String",
    "department": "String",
    "level": "String",
    "matricNumber": "String",
    "courses": [],
    "programmes": [],
    "rateOfClassesAttended": "Number",
    "createdAt": "Date",
    "__v": "Number"
  }
}
```
**Errors**:
- `401 Unauthorized`: Authentication required (no token or invalid token).
- `403 Forbidden`: Insufficient role (not a "student").
- `404 Not Found`: Student data not found.
- `500 Internal Server Error`: Server error.

#### POST /register/admin
Registers a new administrator.
**Request**:
```json
{
  "fullname": "String",
  "email": "String",
  "securityquestion": "String",
  "securityanswer": "String",
  "password": "String (optional, defaults to 'admin123')"
}
```
**Response**:
```json
{
  "message": "Admin registered successfully",
  "adminId": "String (ObjectId)"
}
```
**Errors**:
- `400 Bad Request`: Admin with this email already exists.
- `500 Internal Server Error`: Server error during registration.

#### POST /login/admin
Authenticates an administrator and sets a JWT cookie.
**Request**:
```json
{
  "email": "String",
  "password": "String"
}
```
**Response**:
```json
{
  "message": "Admin logged in successfully",
  "isauthenticated": true,
  "adminId": "String (ObjectId)",
  "role": "admin"
}
```
**Errors**:
- `401 Unauthorized`: Incorrect password.
- `404 Not Found`: Admin not found.
- `500 Internal Server Error`: Server error during login.

#### GET /auth/admin/dashboard
Retrieves comprehensive dashboard analytics for the authenticated administrator.
**Request**: (Requires `token` cookie with `role: "admin"`)
(No payload)
**Response**:
```json
{
  "status": "success",
  "totalStudents": "Number",
  "totalLecturers": "Number",
  "totalCourses": "Number",
  "totalAttendaceRecordsAverage": [
    {
      "level": "Number",
      "average": "Number"
    }
  ],
  "totalClassesHeld": "Number",
  "totalCoursesHeldAverage": [
    {
      "level": "Number",
      "total": "Number"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: Authentication required (no token or invalid token).
- `403 Forbidden`: Insufficient role (not an "admin").
- `500 Internal Server Error`: Server error.

#### GET /courses
Retrieves all courses.
**Request**: (Requires `token` cookie with `role: "admin"`)
(No payload)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "String (ObjectId)",
      "courseTitle": "String",
      "courseCode": "String",
      "department": "String",
      "creditunits": "Number",
      "level": "String",
      "semester": "String",
      "lecturerId": "String (ObjectId, optional)",
      "createdAt": "Date",
      "numberOfclassesheld": [],
      "__v": "Number"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `500 Internal Server Error`: Server error.

#### GET /courses/:course_code
Retrieves a specific course by its course code.
**Request**: (Requires `token` cookie with `role: "admin"`)
Path Parameter: `course_code` - The unique code of the course.
(No payload)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "String (ObjectId)",
      "courseTitle": "String",
      "courseCode": "String",
      "department": "String",
      "creditunits": "Number",
      "level": "String",
      "semester": "String",
      "lecturerId": "String (ObjectId, optional)",
      "createdAt": "Date",
      "numberOfclassesheld": [],
      "__v": "Number"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `500 Internal Server Error`: Server error.

#### POST /course
Adds a new course to the system.
**Request**: (Requires `token` cookie with `role: "admin"`)
```json
{
  "courseTitle": "String",
  "courseCode": "String",
  "department": "String",
  "creditunits": "Number",
  "level": "String",
  "semester": "String",
  "lecturerId": "String (ObjectId, optional)"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "courses registered successfully",
  "addNewCourse": {
    "_id": "String (ObjectId)",
    "courseTitle": "String",
    "courseCode": "String",
    "department": "String",
    "creditunits": "Number",
    "level": "String",
    "semester": "String",
    "lecturerId": "String (ObjectId, optional)",
    "createdAt": "Date",
    "numberOfclassesheld": [],
    "__v": "Number"
  }
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `500 Internal Server Error`: Failed to save course credentials.

#### PATCH /courses/edit
Updates an existing course's information.
**Request**: (Requires `token` cookie with `role: "admin"`)
```json
{
  "course_code": "String (required, code of the course to update)",
  "updatedCourseInfo": {
    "courseTitle": "String (optional)",
    "department": "String (optional)",
    "creditunits": "Number (optional)",
    "level": "String (optional)",
    "semester": "String (optional)",
    "lecturerId": "String (ObjectId, optional)"
  }
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Course updated successfully",
  "course": {
    "_id": "String (ObjectId)",
    "courseTitle": "String",
    "courseCode": "String",
    "department": "String",
    "creditunits": "Number",
    "level": "String",
    "semester": "String",
    "lecturerId": "String (ObjectId, optional)",
    "createdAt": "Date",
    "numberOfclassesheld": [],
    "__v": "Number"
  }
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `400 Bad Request`: Course code and updated course information are required.
- `404 Not Found`: Course not found.
- `500 Internal Server Error`: Server error.

#### DELETE /courses/:courseid
Deletes a course by its course code.
**Request**: (Requires `token` cookie with `role: "admin"`)
Path Parameter: `courseid` - The code of the course to delete.
(No payload)
**Response**:
```json
{
  "status": "success",
  "message": "Course with code [courseid] has been deleted successfully"
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `400 Bad Request`: Course code is required to delete a course.
- `404 Not Found`: Course not found.
- `500 Internal Server Error`: Server error.

#### GET /attendance-records
Retrieves student attendance records with optional filtering and pagination.
**Request**: (Requires `token` cookie with `role: "admin"`)
Query Parameters:
- `studentId`: String (matricNumber to filter by)
- `page`: Integer (page number, defaults to 0)
- `limit`: Integer (results per page, defaults to 20)
- `department`: String (department to filter by)
- `level`: String (level to filter by)
**Response**:
```json
{
  "total": "Number (total matching records)",
  "page": "Number (current page)",
  "limit": "Number (records per page)",
  "results": [
    {
      "_id": "String (ObjectId)",
      "fullname": "String",
      "matricNumber": "String",
      "department": "String",
      "rateOfClassesAttended": "Number"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `500 Internal Server Error`: Internal server error.

#### POST /lecturer/register
Registers a new lecturer.
**Request**: (Requires `token` cookie with `role: "admin"`)
```json
{
  "email": "String (lecturer contact)",
  "password": "String",
  "fullName": "String (lecturer name)",
  "department": "String"
}
```
**Response**:
```json
{
  "message": "Lecturer registered successfully"
}
```
**Errors**:
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role.
- `400 Bad Request`: Missing required fields (email, password, fullName, department).
- `409 Conflict`: Lecturer already exists with this email.
- `500 Internal Server Error`: Failed to register lecturer.

#### POST /lecturer/login
Authenticates a lecturer and sets a JWT cookie.
**Request**:
```json
{
  "email": "String",
  "password": "String"
}
```
**Response**:
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": "String (ObjectId)",
    "email": "String",
    "name": "String",
    "department": "String"
  },
  "role": "lecturer"
}
```
**Errors**:
- `400 Bad Request`: Please provide both email and password.
- `401 Unauthorized`: Invalid login credentials.
- `500 Internal Server Error`: Failed to process login request or error during login process.

## Technologies Used
| Technology   | Description                                     | Link                                                            |
| :----------- | :---------------------------------------------- | :-------------------------------------------------------------- |
| **Node.js**  | JavaScript runtime environment                  | [nodejs.org](https://nodejs.org/)                               |
| **Express.js** | Web framework for Node.js                       | [expressjs.com](https://expressjs.com/)                         |
| **MongoDB**  | NoSQL database                                  | [mongodb.com](https://www.mongodb.com/)                         |
| **Mongoose** | MongoDB object data modeling (ODM) for Node.js  | [mongoosejs.com](https://mongoosejs.com/)                       |
| **JWT**      | JSON Web Tokens for authentication              | [jwt.io](https://jwt.io/)                                       |
| **CORS**     | Middleware for enabling Cross-Origin Resource Sharing | [www.npmjs.com/package/cors](https://www.npmjs.com/package/cors) |
| **Dotenv**   | Loads environment variables from a `.env` file  | [www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |
| **Cookie-parser** | Parse Cookie header and populate `req.cookies` | [www.npmjs.com/package/cookie-parser](https://www.npmjs.com/package/cookie-parser) |

## Contributing
We welcome contributions to enhance this project! To contribute, please follow these guidelines:

*   **Fork the repository** 🌿.
*   **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   **Implement your changes** and ensure they align with the project's coding style.
*   **Write clear, concise commit messages** 📝.
*   **Push your branch** to your forked repository.
*   **Open a Pull Request** 🚀 to the `main` branch of this repository, describing your changes and their benefits.

## License
This project is licensed under the MIT License. For more details, see the [MIT License](https://opensource.org/licenses/MIT).

## Author Info
*   **Your Name**: [LinkedIn](https://linkedin.com/in/your_username) | [Portfolio](https://your-portfolio.com) | [Twitter](https://twitter.com/your_username)

---
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/Mimisax-pixel/school-attendance-biometric-system/backend?style=for-the-badge)](https://github.com/Mimisax-pixel/school-attendance-biometric-system/backend)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)