# 📚 School Attendance Biometric System API

## Overview
This project provides a robust backend API for a school attendance biometric system, built with Node.js and Express. It leverages Mongoose for elegant MongoDB object modeling, facilitating secure student registration, authentication, and the groundwork for biometric-based attendance tracking.

## Features
*   **Student Registration**: Seamlessly register new students with comprehensive personal and academic details.
*   **Student Authentication**: Secure student login using matriculation number, email, or phone number, protected by JWT.
*   **Biometric Data Integration**: Stores biometric identifiers for future attendance verification mechanisms.
*   **Flexible Data Model**: Designed with Mongoose schemas for students and classes, allowing for extensible data management.
*   **JWT-based Authorization**: Implements JSON Web Tokens for secure session management and protecting API routes.
*   **CORS Enabled**: Configured to handle cross-origin requests, ensuring frontend integration.
*   **Environment Configuration**: Utilizes `.env` files for secure and flexible environment variable management.

## Getting Started

To get this API up and running on your local machine, follow these steps.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mimisax-pixel/school-attendance-biometric-system.git
    cd school-attendance-biometric-system/backend
    ```

2.  **Install Dependencies**:
    Navigate into the `backend` directory and install the required Node.js packages.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:
    Create a `.env` file in the `backend` directory and configure the necessary variables. An example is provided in the Environment Variables section.

4.  **Start the Server**:
    You can start the server in development mode (with `nodemon` for auto-restarts) or production mode.
    ```bash
    # For development (with hot-reloading)
    npm run dev

    # For production
    npm start
    ```
    The API will be available at `http://localhost:5000` (or your specified `PORT`).

### Environment Variables
Create a `.env` file in the root of the `backend` directory with the following variables:

| Variable                | Example Value                                  | Description                                           |
| :---------------------- | :--------------------------------------------- | :---------------------------------------------------- |
| `PORT`                  | `5000`                                         | The port on which the Express server will run.        |
| `DB_CONNECTION_STRING`  | `mongodb://localhost:27017/school_attendance`  | Connection string for your MongoDB database.          |
| `JWT_SECRET`            | `your_super_secret_jwt_key_here`               | A secret key used to sign and verify JWTs. Keep this secure. |

## Usage
Once the server is running, you can interact with the API using tools like Postman, Insomnia, or by integrating it with a frontend application.

To make requests:

1.  **Start the API** as described in the Installation section.
2.  **Use an API Client** (e.g., Postman) to send HTTP requests to the defined endpoints.
3.  Ensure your requests include the correct headers (e.g., `Content-Type: application/json` for POST requests).

## Technologies Used

| Technology | Description                                          | Link                                                   |
| :--------- | :--------------------------------------------------- | :----------------------------------------------------- |
| Node.js    | JavaScript runtime for server-side execution.        | [nodejs.org](https://nodejs.org/)                      |
| Express.js | Fast, unopinionated, minimalist web framework for Node.js. | [expressjs.com](https://expressjs.com/)                |
| Mongoose   | MongoDB object data modeling (ODM) for Node.js.      | [mongoosejs.com](https://mongoosejs.com/)              |
| MongoDB    | NoSQL document database.                             | [mongodb.com](https://www.mongodb.com/)                |
| JSON Web Token | For secure, stateless authentication.              | [jwt.io](https://jwt.io/)                              |
| CORS       | Middleware to enable Cross-Origin Resource Sharing.  | [github.com/expressjs/cors](https://github.com/expressjs/cors) |
| Dotenv     | Loads environment variables from a `.env` file.      | [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) |
| Nodemon    | Utility that monitors for changes in your source and automatically restarts your server. | [nodemon.io](https://nodemon.io/) |

## API Documentation

### Base URL
The base URL for all API endpoints is `http://localhost:[PORT]/api/v1`. Replace `[PORT]` with the port your server is running on (e.g., `5000`).

### Endpoints

#### POST /register/student
Registers a new student in the system.

**Request**:
```json
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "09012345678",
  "department": "Computer Science",
  "level": "300",
  "matricNumber": "CST/18/0001",
  "biometricData": "fingerprint_hash_data_string",
  "password": "securepassword123" 
}
```
**Note**: `password` is optional and defaults to "password123" if not provided. `biometricData` is also optional and defaults to "biometric_placeholder" if not provided, but it's required by the schema eventually.

**Response**:
```json
{
  "message": "Student registered successfully",
  "student": {
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09012345678",
    "department": "Computer Science",
    "level": "300",
    "matricNumber": "CST/18/0001",
    "biometricData": "fingerprint_hash_data_string",
    "password": "securepassword123",
    "_id": "65e23f8c8d3e2a001a1b2c3d",
    "attendance": [],
    "createdAt": "2024-03-01T12:00:00.000Z",
    "__v": 0
  }
}
```

**Errors**:
- `400 Bad Request`: Missing required fields (email, phone, department, level, matricNumber), or a student with the provided email, phone, matric number, or biometric data already exists.
- `500 Server Error`: An unexpected server-side error occurred during registration.

#### POST /login/student
Authenticates a student using their matriculation number, email, or phone number, along with their password.

**Request**:
```json
{
  "matricNumber": "CST/18/0001", 
  "password": "securepassword123"
}
```
**Note**: `matricNumber` can be replaced with `email` or `phone` to identify the student.

**Response**:
```json
{
  "message": "Login successful",
  "student": {
    "fullname": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "09012345678",
    "department": "Computer Science",
    "level": "300",
    "matricNumber": "CST/18/0001",
    "biometricData": "fingerprint_hash_data_string",
    "password": "securepassword123",
    "_id": "65e23f8c8d3e2a001a1b2c3d",
    "attendance": [],
    "createdAt": "2024-03-01T12:00:00.000Z",
    "__v": 0
  }
}
```
A `token` cookie containing the JWT will also be set upon successful login.

**Errors**:
- `400 Bad Request`: `matricNumber` (or equivalent identifier) and `password` are required.
- `404 Not Found`: Student not found with the provided identifier.
- `401 Unauthorized`: Invalid password.
- `500 Server Error`: An unexpected server-side error occurred during login.

## License
This project is licensed under the ISC License.

## Author Info

Connect with me:

*   **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/yourusername)
*   **Twitter**: [Your Twitter Profile](https://twitter.com/yourusername)

---
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x%2B-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red?logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JSON%20Web%20Token-Auth-blueviolet?logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![CORS](https://img.shields.io/badge/CORS-Enabled-orange)](https://github.com/expressjs/cors)
[![Project Status](https://img.shields.io/badge/Status-Developing-yellowgreen)](https://github.com/Mimisax-pixel/school-attendance-biometric-system)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)