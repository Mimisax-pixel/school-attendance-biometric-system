import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Student from "./routes/students/register.js";
import loginStudent from "./routes/students/login.js";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/students/dashboard.js";
import adminRoutes from "./routes/admin/register.js";
import admindashboard from "./routes/admin/dashboard.js";
import courseRouter from "./routes/admin/courses.js";
import StudentsRecords from "./routes/admin/students.js";
import Lecturer from "./routes/admin/lecturers.js";
import LecturerLogin from "./routes/lecturers/login.js";
import lecturerCourses from "./routes/lecturers/courses.js"

dotenv.config();
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
const PORT = process.env.PORT || 5000;
let apiVersion = "/api/v1";

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(apiVersion, Student);
app.use(apiVersion, loginStudent);
app.use(apiVersion, dashboardRoutes);
app.use(apiVersion, adminRoutes);
app.use(apiVersion, admindashboard);
app.use(apiVersion, courseRouter);
app.use(apiVersion, StudentsRecords);
app.use(apiVersion, Lecturer);
app.use(apiVersion, LecturerLogin);
app.use(apiVersion, lecturerCourses);

// Basic route to check server status

app.get("/", (req, res) => {
  res.send("Welcome to the School Attendance Biometric System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
