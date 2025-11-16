# School Attendance Biometric System API

## Overview
This is a robust backend API for a school attendance system, built with Node.js, Express, and MongoDB (Mongoose). It facilitates student, lecturer, and administrative management, enabling biometric-based attendance tracking, course administration, and real-time attendance rate computation.

## Features
- **Authentication & Authorization**: Secure JWT-based authentication for Admin, Lecturer, and Student roles with role-based access control middleware.
- **User Management**: Dedicated modules for registering, logging in, and managing Admin, Lecturer, and Student accounts.
- **Course Management**: Admins can add, view, edit, and delete courses. Lecturers can view courses assigned to them.
- **Attendance Sessions**: Lecturers can create class sessions and record student attendance via a check-in mechanism.
- **Student Records**: Admins can view paginated and filtered student records, including attendance rates.
- **Biometric Integration**: Supports student registration with biometric data and subsequent attendance check-ins.
- **Automated Attendance Rate Computation**: A background job periodically calculates and updates student attendance rates, providing valuable insights.
- **Dashboard Analytics**: Admin dashboard provides key statistics like total students, lecturers, courses, average attendance by level, and classes held.

## Getting Started
To get this project up and running on your local machine, follow these steps.

### Installation
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mimisax-pixel/school-attendance-biometric-system.git
    cd school-attendance-biometric-system/backend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000` (or your specified PORT).

    Or, for production:
    ```bash
    npm start
    ```

### Environment Variables
Create a `.env` file in the `backend` directory and populate it with the following required variables. Do NOT commit this file to source control — see the Security note below.

```env
# Backend Environment Variables (example placeholders only)

# Database (replace <username>, <password>, <cluster> and <dbname>)
DB_CONNECTION_STRING="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"

# JWT Secret for token signing (use a long random string)
JWT_SECRET="replace-with-a-strong-random-secret"

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (update for production)
# Development
FRONTEND_URL=http://localhost:5173

# Production (uncomment and update for deployment)
# FRONTEND_URL=https://your-production-frontend.com
```

**Security**

- Never commit `.env` files or secrets to your repository. Use environment variables provided by your hosting platform or a secrets manager in production.
- If a secret is accidentally committed, rotate the credential immediately and remove it from the repository history (see notes below).


## API Documentation
### Base URL
`http://localhost:5000/api/v1` (adjust port if different)

### Endpoints

#### POST /register/student
Registers a new student.
**Request**:
```json
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "09011223344",
  "department": "Computer Science",
  "level": "300",
  "matricNumber": "CST/18/0001",
  "biometricData": "base64EncodedBiometricString",
  "password": "strongpassword"
}
```
**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "id": "65b90b1c0987654321abcdef",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```
**Errors**:
- 400: All fields are required.
- 400: Student with provided email, phone, matric number, or biometric data already exists.
- 500: Server error.

#### POST /login/student
Authenticates a student and sets an HTTP-only cookie with a JWT token.
**Request**:
```json
{
  "email": "jane.doe@example.com",
  "password": "strongpassword"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Login successful",
  "student": {
    "id": "65b90b1c0987654321abcdef",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  },
  "role": "student"
}
```
**Errors**:
- 400: matricnumber and password are required.
- 404: Student not found.
- 401: Invalid password.
- 500: Server error.

#### GET /auth/verify
Verifies the authenticity of the currently logged-in user via their JWT token. Requires `token` cookie.
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "message": "Authenticated",
  "isauthenticated": true
}
```
**Errors**:
- 401: No token provided, authorization denied.
- 401: Token is not valid.

#### GET /auth/student/dashboard
Retrieves dashboard data for the authenticated student. Requires `token` cookie.
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "student": {
    "_id": "65b90b1c0987654321abcdef",
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09011223344",
    "department": "Computer Science",
    "level": "300",
    "matricNumber": "CST/18/0001",
    "courses": [],
    "numberOfCoursesOffered": 0,
    "programmes": [],
    "rateOfClassesAttended": 75,
    "createdAt": "2024-01-30T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `student`).
- 404: Student data not found.
- 500: Server error.

#### POST /register/admin
Registers a new administrator.
**Request**:
```json
{
  "fullname": "Admin User",
  "email": "admin@example.com",
  "password": "adminpassword",
  "securityquestion": "What is your favorite color?",
  "securityanswer": "Blue"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Admin registered successfully",
  "adminId": "65b90b1c0987654321abcde0"
}
```
**Errors**:
- 400: Admin with this email already exists.
- 500: Server error.

#### POST /login/admin
Authenticates an admin and sets an HTTP-only cookie with a JWT token.
**Request**:
```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Admin logged in successfully",
  "isauthenticated": true,
  "adminId": "65b90b1c0987654321abcde0",
  "role": "admin"
}
```
**Errors**:
- 404: Admin not found.
- 401: Incorrect password.
- 500: Server error.

#### GET /auth/admin/dashboard
Retrieves comprehensive dashboard analytics for administrators. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "totalStudents": 150,
  "totalLecturers": 25,
  "totalCourses": 40,
  "totalAttendaceRecordsAverage": [
    { "level": 100, "average": 85.2 },
    { "level": 200, "average": 78.5 },
    { "level": 300, "average": 91.0 },
    { "level": 400, "average": 80.1 },
    { "level": 500, "average": 0 }
  ],
  "totalClassesHeld": 1200,
  "totalCoursesHeldAverage": [
    { "level": 100, "total": 300 },
    { "level": 200, "total": 250 },
    { "level": 300, "total": 400 },
    { "level": 400, "total": 200 },
    { "level": 500, "total": 50 }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Server error.

#### POST /auth/admin/compute-attendance-rates
Manually triggers the computation of attendance rates for all students. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "message": "Attendance rates computed and stored successfully"
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Error computing attendance rates.

#### GET /courses
Retrieves all courses. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "65b90b1c0987654321abcdef",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CST101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "lecturerId": "65b90b1c0987654321abcde1",
      "numberOfClassesHeld": 15,
      "createdAt": "2024-01-30T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Something went wrong.

#### GET /courses/:course_code
Retrieves courses by a specific `course_code`. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "65b90b1c0987654321abcdef",
      "courseTitle": "Introduction to Programming",
      "courseCode": "CST101",
      "department": "Computer Science",
      "creditunits": 3,
      "level": "100",
      "semester": "Harmattan",
      "lecturerId": "65b90b1c0987654321abcde1",
      "numberOfClassesHeld": 15,
      "createdAt": "2024-01-30T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Something went wrong.

#### POST /course
Adds a new course to the system. Requires `token` cookie (Admin role).
**Request**:
```json
{
  "courseTitle": "Data Structures and Algorithms",
  "courseCode": "CST201",
  "department": "Computer Science",
  "creditunits": 4,
  "level": "200",
  "semester": "Rain",
  "lecturerId": "65b90b1c0987654321abcde1"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "courses registered successfully",
  "addNewCourse": {
    "courseTitle": "Data Structures and Algorithms",
    "courseCode": "CST201",
    "department": "Computer Science",
    "creditunits": 4,
    "level": "200",
    "semester": "Rain",
    "lecturerId": "65b90b1c0987654321abcde1",
    "numberOfClassesHeld": 0,
    "_id": "65b90b1c0987654321abcdef",
    "createdAt": "2024-01-30T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Failed to save course credentials.

#### PATCH /courses/edit
Updates an existing course. Requires `token` cookie (Admin role).
**Request**:
```json
{
  "id": "65b90b1c0987654321abcdef",
  "courseTitle": "Advanced Data Structures",
  "creditunits": 5
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Course updated successfully",
  "course": {
    "_id": "65b90b1c0987654321abcdef",
    "courseTitle": "Advanced Data Structures",
    "courseCode": "CST201",
    "department": "Computer Science",
    "creditunits": 5,
    "level": "200",
    "semester": "Rain",
    "lecturerId": "65b90b1c0987654321abcde1",
    "numberOfClassesHeld": 0,
    "createdAt": "2024-01-30T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- 400: Course code and updated course information are required.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 404: Course not found.
- 500: Something went wrong.

#### DELETE /courses/:courseid
Deletes a course by its ID. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "message": "Course with code CST201 has been deleted successfully"
}
```
**Errors**:
- 400: Course code is required to delete a course.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 404: Course not found.
- 500: Something went wrong.

#### GET /attendance-records
Retrieves paginated and filtered student attendance records. Requires `token` cookie (Admin role).
**Query Parameters**:
- `studentId` (optional): Filter by matric number.
- `department` (optional): Filter by department.
- `level` (optional): Filter by student level.
- `page` (optional): Page number (default: 0).
- `limit` (optional): Number of records per page (default: 20).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "total": 50,
  "page": 0,
  "limit": 20,
  "results": [
    {
      "_id": "65b90b1c0987654321abcdef",
      "fullname": "John Doe",
      "matricNumber": "CST/19/0001",
      "department": "Computer Science",
      "rateOfClassesAttended": 85.5
    }
    // ... more student records
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Internal server error.

#### POST /lecturer/register
Registers a new lecturer. Requires `token` cookie (Admin role).
**Request**:
```json
{
  "email": "lecturer@example.com",
  "password": "lecturerpassword",
  "fullName": "Dr. Alice Smith",
  "department": "Computer Science"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Lecturer registered successfully"
}
```
**Errors**:
- 400: Missing required fields: email, password, fullName, and department are required.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 409: Lecturer already exists with this email.
- 500: Failed to register lecturer.

#### GET /lecturers
Retrieves a list of all lecturers. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "_id": "65b90b1c0987654321abcde1",
      "name": "Dr. Alice Smith",
      "department": "Computer Science",
      "contact": "lecturer@example.com",
      "courses_assigned": [],
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Failed to fetch lecturers.

#### GET /lecturers/search
Searches for lecturers by name, contact, or department. Requires `token` cookie (Admin role).
**Query Parameters**:
- `q` (required): Search term.
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "65b90b1c0987654321abcde1",
      "name": "Dr. Alice Smith",
      "department": "Computer Science",
      "contact": "lecturer@example.com",
      "courses_assigned": [],
      "__v": 0
    }
  ]
}
```
**Errors**:
- 400: Query parameter q is required.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 500: Failed to search lecturers.

#### PUT /lecturer/:id
Updates a lecturer's information by ID. Requires `token` cookie (Admin role).
**Request**:
```json
{
  "name": "Dr. Alice Johnson",
  "department": "Software Engineering",
  "courses_assigned": ["CST101", "CST201"]
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Lecturer updated",
  "data": {
    "_id": "65b90b1c0987654321abcde1",
    "name": "Dr. Alice Johnson",
    "department": "Software Engineering",
    "contact": "lecturer@example.com",
    "courses_assigned": ["CST101", "CST201"],
    "__v": 0
  }
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 404: Lecturer not found.
- 500: Failed to update lecturer.

#### DELETE /lecturer/:id
Deletes a lecturer by ID. Requires `token` cookie (Admin role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "message": "Lecturer deleted"
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `admin`).
- 404: Lecturer not found.
- 500: Failed to delete lecturer.

#### POST /login/lecturer
Authenticates a lecturer and sets an HTTP-only cookie with a JWT token.
**Request**:
```json
{
  "email": "lecturer@example.com",
  "password": "lecturerpassword"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "id": "65b90b1c0987654321abcde1",
    "email": "lecturer@example.com",
    "name": "Dr. Alice Smith",
    "department": "Computer Science"
  },
  "role": "lecturer"
}
```
**Errors**:
- 400: Please provide both email and password.
- 401: Invalid login credentials.
- 500: Failed to process login request.

#### POST /lecturer/courses
Retrieves courses assigned to the authenticated lecturer. Requires `token` cookie (Lecturer role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "courses": [
    {
      "_id": "65b90b1c0987654321abcefg",
      "courseTitle": "Data Structures",
      "courseCode": "CST201",
      "department": "Computer Science",
      "creditunits": 4,
      "level": "200",
      "semester": "Rain",
      "lecturerId": "65b90b1c0987654321abcde1",
      "numberOfClassesHeld": 10,
      "createdAt": "2024-01-30T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 400: Bad request.
- 500: Something went wrong.

#### POST /session
Creates a new class attendance session. Requires `token` cookie (Lecturer role).
**Request**:
```json
{
  "department": "Computer Science",
  "courseCode": "CST201"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Class created successfully",
  "data": {
    "level": "200",
    "department": "Computer Science",
    "courseTitle": "Data Structures and Algorithms",
    "instructorId": "65b90b1c0987654321abcde1",
    "courseCode": "CST201",
    "numberOfStudentPresent": 0,
    "_id": "65b90b1c0987654321abcfgd",
    "createdAt": "2024-01-30T10:00:00.000Z",
    "__v": 0,
    "instructorName": "Dr. Alice Smith"
  }
}
```
**Errors**:
- 400: All fields are required.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 404: Lecturer not found.
- 500: Server error.

#### GET /sessions
Retrieves all class attendance sessions created by the authenticated lecturer. Requires `token` cookie (Lecturer role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "65b90b1c0987654321abcfgd",
      "level": "200",
      "department": "Computer Science",
      "courseTitle": "Data Structures and Algorithms",
      "courseCode": "CST201",
      "instructorId": "65b90b1c0987654321abcde1",
      "numberOfStudentPresent": 5,
      "createdAt": "2024-01-30T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 500: Server error.

#### GET /session/lecturer-sessions
Retrieves all class attendance sessions created by the authenticated lecturer. (Alias of `/sessions`). Requires `token` cookie (Lecturer role).
**Request**: (No body)
**Response**:
```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "_id": "65b90b1c0987654321abcfgd",
      "level": "200",
      "department": "Computer Science",
      "courseTitle": "Data Structures and Algorithms",
      "courseCode": "CST201",
      "instructorId": "65b90b1c0987654321abcde1",
      "numberOfStudentPresent": 5,
      "createdAt": "2024-01-30T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 500: Server error.

#### POST /session/student_details
Fetches details of a student using their matric number. Requires `token` cookie (Lecturer role).
**Request**:
```json
{
  "studentId": "CST/18/0001"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "student found",
  "data": {
    "_id": "65b90b1c0987654321abcdef",
    "fullname": "Jane Doe",
    "matricNumber": "CST/18/0001",
    "department": "Computer Science",
    "level": "300",
    "biometricData": "base64EncodedBiometricString"
  }
}
```
**Errors**:
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 404: Student not found.
- 500: Server error.

#### POST /session/checkin
Records a student's attendance for a specific class session. Requires `token` cookie (Lecturer role).
**Request**:
```json
{
  "studentId": "CST/18/0001",
  "classId": "65b90b1c0987654321abcfgd"
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Check-in successful",
  "data": {
    "studentId": "CST/18/0001",
    "classId": "65b90b1c0987654321abcfgd",
    "timestamp": "2024-01-30T10:30:00.000Z",
    "_id": "65b90b1c0987654321abchij",
    "__v": 0
  }
}
```
**Errors**:
- 400: All fields are required.
- 401: Authorization errors (No token, invalid token).
- 403: Forbidden: insufficient role (if user is not `lecturer`).
- 500: Server error.

## Usage

This backend powers the core functionalities of the School Attendance Biometric System. Once deployed and running, it exposes API endpoints that can be consumed by a frontend application (e.g., a React, Angular, or Vue.js client) to:

1.  **Register Users**: Students can register with their personal details and biometric data. Admins and Lecturers can also be registered by an existing Admin.
2.  **User Login**: Authenticate different user roles (Student, Lecturer, Admin) to gain access to their respective functionalities.
3.  **Manage Courses**: Admins can add, update, and remove courses, assigning them to specific lecturers.
4.  **Conduct Attendance**: Lecturers can initiate attendance sessions for their courses, and students can check-in using their registered biometric data.
5.  **View Dashboards**: Students can view their personal attendance records and course information. Lecturers can monitor their class sessions, and Admins can access a comprehensive system overview and manage all users and courses.
6.  **Automated Processes**: The system automatically calculates and updates student attendance rates in the background, ensuring data is always current.

Integrate this API by sending HTTP requests to the documented endpoints using an API client (like Postman, Insomnia) or directly from your frontend application. Ensure that proper authentication tokens (cookies) are handled for protected routes.

## Technologies Used

| Technology  | Description                                 | Link                                                                        |
| :---------- | :------------------------------------------ | :-------------------------------------------------------------------------- |
| Node.js     | JavaScript runtime environment              | [Node.js](https://nodejs.org/en/)                                           |
| Express.js  | Web framework for Node.js                   | [Express.js](https://expressjs.com/)                                        |
| MongoDB     | NoSQL database                              | [MongoDB](https://www.mongodb.com/)                                         |
| Mongoose    | MongoDB object data modeling (ODM) for Node.js | [Mongoose](https://mongoosejs.com/)                                         |
| JSON Web Tokens (JWT) | Secure authentication for APIs      | [JWT.io](https://jwt.io/)                                                   |
| Dotenv      | Loads environment variables from a `.env` file | [Dotenv](https://www.npmjs.com/package/dotenv)                              |
| CORS        | Middleware for enabling Cross-Origin Resource Sharing | [CORS](https://www.npmjs.com/package/cors)                                  |
| Cookie-parser | Middleware for parsing HTTP cookies         | [Cookie-parser](https://www.npmjs.com/package/cookie-parser)                |

## Contributing
We welcome contributions to enhance this project! If you're interested in contributing, please follow these guidelines:

*   🍴 **Fork the repository**.
*   🌳 Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   💻 Make your changes and ensure they adhere to the project's coding style.
*   ✅ Write clear, concise commit messages.
*   🧪 Test your changes thoroughly.
*   ⬆️ Push your branch: `git push origin feature/your-feature-name`.
*   🔄 Open a pull request against the `main` branch, describing your changes in detail.

## Author Info

-   **Your Name**: [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile) | [Twitter](https://twitter.com/your-twitter-handle) | [Portfolio](https://your-portfolio-website.com)

---
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)