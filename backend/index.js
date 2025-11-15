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
import lecturerCourses from "./routes/lecturers/courses.js";
import AttendanceSessions from "./routes/lecturers/session.js";
import { startAttendanceRateJob } from "./jobs/computeAttendanceRates.js";

dotenv.config();
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log(process.env.NODE_ENV);
    // Start background job for computing attendance rates (every 1 hour)
    startAttendanceRateJob(60 * 60 * 1000);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
const PORT = process.env.PORT || 5000;
let apiVersion = "/api/v1";

// Middleware
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const allowedOrigins = [frontendUrl, "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
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
app.use(apiVersion, AttendanceSessions);

// Basic route to check server status

app.get("/", (req, res) => {
  res.send("Welcome to the School Attendance Biometric System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
