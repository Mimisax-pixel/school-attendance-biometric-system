# School Attendance Biometric System API 📚

## Overview
This project is a robust backend API for a School Attendance Biometric System, built with Node.js, Express, and Mongoose. It facilitates student and administrative operations, including user authentication, student registration, course management, and comprehensive dashboard analytics.

## Features
✨ Seamless User Authentication: Secure login and registration for both students and administrators using JWT.
⚙️ Biometric Integration Ready: Designed to support biometric data for enhanced attendance tracking.
📊 Dynamic Dashboards: Provides insightful data for students (personal info) and administrators (total students, lecturers, courses, attendance averages).
📚 Course Management: CRUD operations for courses, enabling administrators to manage course details efficiently.
🔒 Role-Based Access Control: Middleware ensures appropriate access levels for authenticated student and admin users.
💾 MongoDB Integration: Utilizes Mongoose for flexible and scalable data persistence.

## Technologies Used

| Technology         | Description                                                                  | Version   | Link                                                 |
| :----------------- | :--------------------------------------------------------------------------- | :-------- | :--------------------------------------------------- |
| **Node.js**        | JavaScript runtime for server-side development.                              | ^20.x     | [nodejs.org](https://nodejs.org/en/)                 |
| **Express.js**     | Fast, unopinionated, minimalist web framework for Node.js.                   | ^5.1.0    | [expressjs.com](https://expressjs.com/)              |
| **Mongoose**       | MongoDB object modeling for Node.js.                                         | ^8.19.1   | [mongoosejs.com](https://mongoosejs.com/)            |
| **MongoDB**        | NoSQL database for flexible data storage.                                    | ^6.20.0   | [mongodb.com](https://www.mongodb.com/)              |
| **JSON Web Tokens**| For secure authentication and authorization.                                 | ^9.0.2    | [jwt.io](https://jwt.io/)                            |
| **Dotenv**         | Loads environment variables from a `.env` file.                              | ^17.2.3   | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |
| **CORS**           | Middleware to enable Cross-Origin Resource Sharing.                          | ^2.8.5    | [npmjs.com/package/cors](https://www.npmjs.com/package/cors) |
| **Cookie Parser**  | Middleware for parsing HTTP request cookies.                                 | ^1.4.7    | [npmjs.com/package/cookie-parser](https://www.npmjs.com/package/cookie-parser) |
| **Nodemon**        | Utility that monitors for changes in your source and automatically restarts your server. | ^3.x      | [npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon) |


## Getting Started

### Installation
To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mimisax-pixel/school-attendance-biometric-system.git
    cd school-attendance-biometric-system/backend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env` file in the `backend` directory and add the required variables as specified below.

### Environment Variables
All required environment variables must be defined in a `.env` file in the root of the `backend` directory.

-   `DB_CONNECTION_STRING`: MongoDB connection string.
    -   Example: `DB_CONNECTION_STRING=mongodb+srv://user:password@cluster.mongodb.net/school_attendance?retryWrites=true&w=majority`
-   `PORT`: The port the server will run on.
    -   Example: `PORT=5000`
-   `JWT_SECRET`: A secret key for signing JWT tokens.
    -   Example: `JWT_SECRET=your_super_secret_jwt_key_here`

## Usage
To start the server, navigate to the `backend` directory and run one of the following commands:

**Development Mode (with Nodemon for auto-restarts):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```
The API will then be accessible at `http://localhost:<PORT>` (e.g., `http://localhost:5000`).

## API Documentation

### Base URL
`https://your-domain.com/api/v1` (replace `your-domain.com` with `localhost:<PORT>` for local development)

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
  "matricNumber": "CST/2020/001",
  "password": "securepassword123",
  "biometricData": "fingerprint_hash_string_or_image_data"
}
```

**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "60c72b2f9b1e8b0015f8a3b1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```

**Errors**:
-   `400 Bad Request`: All fields are required.
-   `400 Bad Request`: Student with provided email, phone, matric number, or biometric data already exists.
-   `500 Internal Server Error`: Server error.

#### `POST /api/v1/login/student`
Authenticates a student and issues a JWT token.

**Request**:
```json
{
  "matricNumber": "CST/2020/001",
  "password": "securepassword123"
}
```
*(Note: `matricNumber` can also be `email` or `phone`)*

**Response**:
```json
{
  "message": "Login successful",
  "student": {
    "id": "60c72b2f9b1e8b0015f8a3b1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  },
  "role": "student"
}
```
*(Sets `token` cookie)*

**Errors**:
-   `400 Bad Request`: matricnumber and password are required.
-   `404 Not Found`: Student not found.
-   `401 Unauthorized`: Invalid password.
-   `500 Internal Server Error`: Server error.

#### `GET /api/v1/auth/student/check`
Checks if the student's JWT token is valid and active.

**Request**:
*(Requires valid JWT token in cookie)*

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

#### `GET /api/v1/auth/student/dashboard`
Retrieves dashboard data for the authenticated student.

**Request**:
*(Requires valid JWT token in cookie)*

**Response**:
```json
{
  "student": {
    "_id": "60c72b2f9b1e8b0015f8a3b1",
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09012345678",
    "department": "Computer Science",
    "level": "200",
    "matricNumber": "CST/2020/001",
    "courses": [],
    "programmes": [],
    "createdAt": "2023-01-01T12:00:00.000Z"
  }
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `404 Not Found`: Student not data not found.
-   `500 Internal Server Error`: Server error.

#### `POST /api/v1/register/admin`
Registers a new administrator.

**Request**:
```json
{
  "fullname": "Admin User",
  "email": "admin@example.com",
  "password": "adminsecurepassword",
  "securityquestion": "What is your favorite color?",
  "securityanswer": "Blue"
}
```

**Response**:
```json
{
  "message": "Admin registered successfully",
  "adminId": "60c72b2f9b1e8b0015f8a3b2"
}
```

**Errors**:
-   `400 Bad Request`: Admin with this email already exists.
-   `500 Internal Server Error`: Server error.

#### `POST /api/v1/login/admin`
Authenticates an administrator and issues a JWT token.

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "adminsecurepassword"
}
```

**Response**:
```json
{
  "message": "Admin logged in successfully",
  "isauthenticated": true,
  "adminId": "60c72b2f9b1e8b0015f8a3b2",
  "role": "admin"
}
```
*(Sets `token` cookie)*

**Errors**:
-   `404 Not Found`: Admin not found.
-   `401 Unauthorized`: Incorrect password.
-   `500 Internal Server Error`: Server error.

#### `GET /api/v1/auth/admin/dashboard`
Retrieves comprehensive dashboard analytics for administrators.

**Request**:
*(Requires valid admin JWT token in cookie)*

**Response**:
```json
{
  "status": "success",
  "totalStudents": 150,
  "totalLecturers": 20,
  "totalCourses": 30,
  "totalAttendaceRecordsAverage": [
    { "level": 100, "average": 75.5 },
    { "level": 200, "average": 82.1 },
    { "level": 300, "average": 68.9 }
  ],
  "totalClassesHeld": 1200,
  "totalCoursesHeldAverage": [
    { "level": 100, "total": 300 },
    { "level": 200, "total": 450 },
    { "level": 300, "total": 280 }
  ]
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `500 Internal Server Error`: Server error.

#### `GET /api/v1/courses`
Retrieves all courses.

**Request**:
*(Requires valid admin JWT token in cookie)*

**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "60c72b2f9b1e8b0015f8a3b3",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CSC101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "numberOfclassesheld": []
    }
  ]
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `500 Internal Server Error`: Something went wrong.

#### `GET /api/v1/courses/:course_code`
Retrieves a specific course by its code.

**Request**:
*(Requires valid admin JWT token in cookie)*

**Path Parameters**:
-   `course_code`: The unique code of the course (e.g., `CSC101`).

**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "60c72b2f9b1e8b0015f8a3b3",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CSC101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "numberOfclassesheld": []
    }
  ]
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `500 Internal Server Error`: Something went wrong.

#### `POST /api/v1/course`
Adds a new course to the system.

**Request**:
*(Requires valid admin JWT token in cookie)*
```json
{
  "courseTitle": "Data Structures and Algorithms",
  "courseCode": "CSC205",
  "department": "Computer Science",
  "creditunits": 4,
  "level": "200",
  "semester": "Rain",
  "lecturerId": "60c72b2f9b1e8b0015f8a3b9"
}
```

**Response**:
```json
{
  "message": "courses registered successfully",
  "addNewCourse": {
    "courseTitle": "Data Structures and Algorithms",
    "courseCode": "CSC205",
    "department": "Computer Science",
    "creditunits": 4,
    "level": "200",
    "semester": "Rain",
    "lecturerId": "60c72b2f9b1e8b0015f8a3b9",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "numberOfclassesheld": [],
    "_id": "60c72b2f9b1e8b0015f8a3ba"
  }
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `500 Internal Server Error`: failed to save coourse credentials.

#### `PATCH /api/v1/courses/edit`
Updates an existing course.

**Request**:
*(Requires valid admin JWT token in cookie)*
```json
{
  "course_code": "CSC101",
  "updatedCourseInfo": {
    "courseTitle": "Introduction to Programming (Revised)",
    "creditunits": 4
  }
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Course updated successfully",
  "course": {
    "_id": "60c72b2f9b1e8b0015f8a3b3",
    "courseTitle": "Introduction to Programming (Revised)",
    "courseCode": "CSC101",
    "department": "Computer Science",
    "creditunits": 4,
    "level": "100",
    "semester": "Harmattan",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "numberOfclassesheld": []
  }
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `400 Bad Request`: Course code and updated course information are required.
-   `404 Not Found`: Course not found.
-   `500 Internal Server Error`: Something went wrong.

#### `DELETE /api/v1/courses/:courseid`
Deletes a course by its course code.

**Request**:
*(Requires valid admin JWT token in cookie)*

**Path Parameters**:
-   `courseid`: The `courseCode` of the course to be deleted (e.g., `CSC101`).

**Response**:
```json
{
  "status": "success",
  "message": "Course with code CSC101 has been deleted successfully"
}
```

**Errors**:
-   `401 Unauthorized`: No token provided, authorization denied.
-   `401 Unauthorized`: Token is not valid.
-   `400 Bad Request`: Course code is required to delete a course.
-   `404 Not Found`: Course not found.
-   `500 Internal Server Error`: Something went wrong.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:
1.  ✨ Fork the project.
2.  ⚙️ Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  ✏️ Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  ⬆️ Push to the Branch (`git push origin feature/AmazingFeature`).
5.  🤝 Open a Pull Request.

## License
Distributed under the MIT License. See `LICENSE` for more information. (Note: No LICENSE file was found in the provided directory structure, so this is a placeholder for standard practice.)

## Author Info

-   **Name**: [Your Name]
-   **LinkedIn**: [Your LinkedIn Profile]
-   **Twitter**: [Your Twitter Handle]

---

### Badges
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-brightgreen?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red?style=flat&logo=mongoose)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)