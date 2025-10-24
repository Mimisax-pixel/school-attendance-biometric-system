# **School Attendance Biometric System API** 🔐

## Overview
This project provides a robust backend API for a school attendance and management system. Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, it features comprehensive user authentication (Admin, Lecturer, Student), secure role-based access control, and modules for managing students, lecturers, and courses, with provisions for biometric attendance tracking.

## Features
- **User Authentication**: Secure login and registration flows for students, lecturers, and administrators.
- **Role-Based Access Control**: Middleware ensures that users can only access endpoints and data relevant to their assigned roles.
- **Student Management**: Facilitates the registration of new students, retrieval of student records, and tracking of attendance rates.
- **Course Management**: Allows administrators to add, view, edit, and delete courses, including details like course title, code, department, and credit units.
- **Lecturer Management**: Provides functionality for registering new lecturers and assigning them to specific departments and courses.
- **Admin Dashboard**: Offers a centralized overview with key statistics, including total students, lecturers, courses, and attendance analytics broken down by academic level.
- **Biometric Integration Placeholder**: Designed with a structure to easily integrate actual biometric data for streamlined attendance recording.

## Getting Started

### Installation
To set up and run the project locally, follow these steps:

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
4.  **Create `.env` File**:
    Create a `.env` file in the `backend` directory based on the environment variables section below.

### Environment Variables
The following environment variables are required to run the application:

-   `PORT`: The port number the server will listen on (e.g., `5000`).
-   `DB_CONNECTION_STRING`: Your MongoDB connection URI (e.g., `mongodb+srv://user:password@cluster.mongodb.net/dbname`).
-   `JWT_SECRET`: A strong secret key for signing JWT tokens (e.g., `supersecretjwtkey123`).

**Example `.env` file:**
```
PORT=5000
DB_CONNECTION_STRING=mongodb+srv://user:password@cluster.abcde.mongodb.net/school_attendance?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

## Usage

After completing the installation and setting up your environment variables, you can start the server:

1.  **Start the Server in Development Mode**:
    ```bash
    npm run dev
    ```
    The server will start on the `PORT` specified in your `.env` file (defaulting to 5000).

2.  **Access the API**:
    The API will be available at `http://localhost:[PORT]/api/v1`. You can then use tools like Postman, Insomnia, or your frontend application to interact with the documented endpoints below.

**Authentication Flow**:
*   **Students, Lecturers, and Admins** register and log in via their respective endpoints.
*   Upon successful login, a JWT token is issued as an `httpOnly` cookie.
*   This cookie must be sent with subsequent authenticated requests (e.g., to dashboard or protected resource endpoints).
*   Role-based access control ensures that only authorized users can perform certain actions. For instance, only an admin can register new lecturers or manage courses.

## Technologies Used

| Technology    | Description                                       |
| :------------ | :------------------------------------------------ |
| **Node.js**   | A JavaScript runtime built on Chrome's V8 engine. |
| **Express.js**| A fast, unopinionated, minimalist web framework for Node.js. |
| **Mongoose**  | An elegant MongoDB object modeling for Node.js. |
| **MongoDB**   | A NoSQL, document-oriented database.             |
| **JWT**       | JSON Web Tokens for secure authentication.       |
| **Dotenv**    | Loads environment variables from a `.env` file.  |
| **CORS**      | Middleware for enabling Cross-Origin Resource Sharing. |
| **Cookie-parser** | Parse Cookie header and populate `req.cookies`. |

## API Documentation

### Base URL
`http://localhost:[PORT]/api/v1`

### Endpoints

#### `POST /api/v1/register/student`
Registers a new student.
**Request**:
```json
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "09012345678",
  "department": "Computer Science",
  "level": "200",
  "matricNumber": "CST/20/001",
  "password": "SecurePassword123",
  "biometricData": "fingerprint_hash_string_or_id" 
}
```
**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "60e1b1b0e2d1d2001c8c8c8c",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```
**Errors**:
- `400 Bad Request`: All fields are required. Student with provided email, phone, matric number, or biometric data already exists.
- `500 Internal Server Error`: Server error during registration.

#### `POST /api/v1/login/student`
Authenticates a student and issues a JWT token.
**Request**:
```json
{
  "matricNumber": "CST/20/001",
  "password": "SecurePassword123"
}
```
**Response**:
```json
{
  "message": "Login successful",
  "student": {
    "id": "60e1b1b0e2d1d2001c8c8c8c",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  },
  "role": "student"
}
```
**Errors**:
- `400 Bad Request`: Matric number/email/phone and password are required.
- `401 Unauthorized`: Invalid password.
- `404 Not Found`: Student not found.
- `500 Internal Server Error`: Server error during login.

#### `GET /api/v1/auth/student/check`
Checks if the student is authenticated (requires JWT cookie).
**Request**: (No body)
**Response**:
```json
{
  "message": "Authenticated",
  "isauthenticated": true
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.

#### `GET /api/v1/auth/student/dashboard`
Retrieves authenticated student's dashboard data (requires JWT cookie).
**Request**: (No body)
**Response**:
```json
{
  "student": {
    "_id": "60e1b1b0e2d1d2001c8c8c8c",
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09012345678",
    "department": "Computer Science",
    "level": "200",
    "matricNumber": "CST/20/001",
    "courses": [],
    "programmes": [],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `404 Not Found`: Student data not found.
- `500 Internal Server Error`: Server error.

#### `POST /api/v1/register/admin`
Registers a new admin user.
**Request**:
```json
{
  "fullname": "Admin User",
  "email": "admin@example.com",
  "password": "AdminSecurePassword",
  "securityquestion": "What is your favorite color?",
  "securityanswer": "Blue"
}
```
**Response**:
```json
{
  "message": "Admin registered successfully",
  "adminId": "60e1b1b0e2d1d2001c8c8c8d"
}
```
**Errors**:
- `400 Bad Request`: Admin with this email already exists.
- `500 Internal Server Error`: Server error.

#### `POST /api/v1/login/admin`
Authenticates an admin user and issues a JWT token.
**Request**:
```json
{
  "email": "admin@example.com",
  "password": "AdminSecurePassword"
}
```
**Response**:
```json
{
  "message": "Admin logged in successfully",
  "isauthenticated": true,
  "adminId": "60e1b1b0e2d1d2001c8c8c8d",
  "role": "admin"
}
```
**Errors**:
- `401 Unauthorized`: Incorrect password.
- `404 Not Found`: Admin not found.
- `500 Internal Server Error`: Server error.

#### `GET /api/v1/auth/admin/dashboard`
Retrieves administrative dashboard statistics (requires JWT cookie, role: admin).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "totalStudents": 1500,
  "totalLecturers": 50,
  "totalCourses": 120,
  "totalAttendaceRecordsAverage": [
    { "level": 100, "average": 85.5 },
    { "level": 200, "average": 78.2 },
    { "level": 300, "average": 91.0 },
    { "level": 400, "average": 70.1 }
  ],
  "totalClassesHeld": 2500,
  "totalCoursesHeldAverage": [
    { "level": 100, "total": 600 },
    { "level": 200, "total": 700 },
    { "level": 300, "total": 800 },
    { "level": 400, "total": 400 }
  ]
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `500 Internal Server Error`: Server error.

#### `POST /api/v1/lecturer/register`
Registers a new lecturer (requires JWT cookie, role: admin).
**Request**:
```json
{
  "email": "lecturer@example.com",
  "password": "LecturerPass123",
  "fullName": "Dr. John Smith",
  "department": "Computer Science"
}
```
**Response**:
```json
{
  "message": "Lecturer registered successfully"
}
```
**Errors**:
- `400 Bad Request`: Missing required fields: email, password, fullName, and department are required.
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `409 Conflict`: Lecturer already exists with this email.
- `500 Internal Server Error`: Failed to register lecturer.

#### `POST /api/v1/lecturer/login`
Authenticates a lecturer and issues a JWT token.
**Request**:
```json
{
  "email": "lecturer@example.com",
  "password": "LecturerPass123"
}
```
**Response**:
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": "60e1b1b0e2d1d2001c8c8c8e",
    "email": "lecturer@example.com",
    "name": "Dr. John Smith",
    "department": "Computer Science"
  },
  "role": "lecturer"
}
```
**Errors**:
- `400 Bad Request`: Please provide both email and password.
- `401 Unauthorized`: Invalid login credentials.
- `500 Internal Server Error`: Failed to process login request or error during login process.

#### `GET /api/v1/courses`
Retrieves all courses (requires JWT cookie).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "60e1b1b0e2d1d2001c8c8c8f",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CST101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "numberOfclassesheld": []
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `500 Internal Server Error`: Something went wrong.

#### `GET /api/v1/courses/:course_code`
Retrieves a specific course by its code (requires JWT cookie).
**Request**: (Path parameter `course_code`)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "60e1b1b0e2d1d2001c8c8c8f",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CST101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "numberOfclassesheld": []
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `500 Internal Server Error`: Something went wrong.

#### `POST /api/v1/course`
Adds a new course (requires JWT cookie, role: admin or lecturer).
**Request**:
```json
{
  "courseTitle": "Data Structures and Algorithms",
  "courseCode": "CST202",
  "department": "Computer Science",
  "creditunits": 4,
  "level": "200",
  "semester": "Rain",
  "lecturerId": "60e1b1b0e2d1d2001c8c8c8e"
}
```
**Response**:
```json
{
  "message": "courses registered successfully",
  "addNewCourse": {
    "courseTitle": "Data Structures and Algorithms",
    "courseCode": "CST202",
    "department": "Computer Science",
    "creditunits": 4,
    "level": "200",
    "semester": "Rain",
    "lecturerId": "60e1b1b0e2d1d2001c8c8c8e",
    "_id": "60e1b1b0e2d1d2001c8c8c90",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "numberOfclassesheld": []
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `500 Internal Server Error`: Failed to save course credentials.

#### `PATCH /api/v1/courses/edit`
Updates an existing course (requires JWT cookie, role: admin or lecturer).
**Request**:
```json
{
  "course_code": "CST202",
  "updatedCourseInfo": {
    "courseTitle": "Advanced Data Structures",
    "creditunits": 5
  }
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Course updated successfully",
  "course": {
    "_id": "60e1b1b0e2d1d2001c8c8c90",
    "courseTitle": "Advanced Data Structures",
    "courseCode": "CST202",
    "department": "Computer Science",
    "creditunits": 5,
    "level": "200",
    "semester": "Rain",
    "lecturerId": "60e1b1b0e2d1d2001c8c8c8e",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "numberOfclassesheld": []
  }
}
```
**Errors**:
- `400 Bad Request`: Course code and updated course information are required.
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `404 Not Found`: Course not found.
- `500 Internal Server Error`: Something went wrong.

#### `DELETE /api/v1/courses/:courseid`
Deletes a course by its course code (requires JWT cookie, role: admin or lecturer).
**Request**: (Path parameter `courseid` which maps to `courseCode`)
**Response**:
```json
{
  "status": "success",
  "message": "Course with code CST202 has been deleted successfully"
}
```
**Errors**:
- `400 Bad Request`: Course code is required to delete a course.
- `401 Unauthorized`: No token provided, authorization denied, or token is not valid.
- `404 Not Found`: Course not found.
- `500 Internal Server Error`: Something went wrong.

#### `GET /api/v1/attendance-records`
Retrieves student records with optional filtering and pagination.
**Request**: (Query parameters: `studentId`, `page`, `department`, `level`, `limit`)
**Example Query**: `/api/v1/attendance-records?department=Computer%20Science&level=200&page=0&limit=10`
**Response**:
```json
{
  "total": 50,
  "page": 0,
  "limit": 10,
  "results": [
    {
      "_id": "60e1b1b0e2d1d2001c8c8c8c",
      "fullname": "Jane Doe",
      "matricNumber": "CST/20/001",
      "department": "Computer Science",
      "rateOfClassesAttended": 85
    },
    {
      "_id": "60e1b1b0e2d1d2001c8c8c91",
      "fullname": "John Mark",
      "matricNumber": "CST/20/002",
      "department": "Computer Science",
      "rateOfClassesAttended": 75
    }
  ]
}
```
**Errors**:
- `500 Internal Server Error`: Internal server error.

## Contributing

We welcome contributions to enhance this School Attendance Biometric System! To contribute:

-   ⭐ **Fork the repository**.
-   🌿 **Create a new branch** for your feature or bug fix (`git checkout -b feature/your-feature-name`).
-   ✍️ **Make your changes** and ensure your code adheres to the project's style.
-   🧪 **Write and run tests** (if applicable) to ensure functionality.
-   ➕ **Commit your changes** with clear and concise messages.
-   ⬆️ **Push your branch** to your forked repository.
-   🤝 **Open a Pull Request** to the `main` branch of the original repository.

Please ensure your pull request clearly describes the problem it solves or the feature it adds.

## License

This project is licensed under the MIT License.

## Author Info

-   **Name**: [Your Name Here]
-   **LinkedIn**: [Your LinkedIn Profile]
-   **Twitter**: [Your Twitter Handle]

---

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?logo=express&logoColor=white)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-purple?logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![CORS](https://img.shields.io/badge/CORS-Middleware-orange)](https://www.npmjs.com/package/cors)
[![Dotenv](https://img.shields.io/badge/Dotenv-Config-yellowgreen)](https://www.npmjs.com/package/dotenv)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)