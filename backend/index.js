import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Student from "./routes/students/register.js";
import loginStudent from "./routes/students/login.js";
import studentDataRoutes from "./routes/students/data.js";
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
import Department from "./routes/admin/departments.js";
import AlertsRoutes from "./routes/admin/alerts.js";
import AcademicSession from "./routes/admin/academicSession.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { logger } from "./utils/logger.js";
import { successResponse } from "./utils/response.js";
import swaggerConfig from "./config/swagger.js";

dotenv.config();
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    logger.info("Connected to MongoDB", {
      database: "school-attendance-biometric",
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err);
    process.exit(1);
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
      logger.warn(`Origin ${origin} not allowed by CORS`, { origin });
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
app.use(requestLogger);
app.use(apiVersion, Student);
app.use(apiVersion, loginStudent);
app.use(apiVersion, dashboardRoutes);
app.use(apiVersion, studentDataRoutes);
app.use(apiVersion, adminRoutes);
app.use(apiVersion, admindashboard);
app.use(apiVersion, courseRouter);
app.use(apiVersion, StudentsRecords);
app.use(apiVersion, Lecturer);
app.use(apiVersion, LecturerLogin);
app.use(apiVersion, lecturerCourses);
app.use(apiVersion, AttendanceSessions);
app.use(apiVersion, Department);
app.use(apiVersion, AlertsRoutes);
app.use(apiVersion, AcademicSession);

// Swagger Documentation
const specs = swaggerJsdoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs));

// Health check endpoint
app.get("/health", (req, res) => {
  successResponse(
    res,
    { status: "healthy", timestamp: new Date() },
    "Server is healthy",
  );
});

// Basic route to check server status
app.get("/", (req, res) => {
  successResponse(
    res,
    {
      message: "Welcome to the School Attendance Biometric System API",
      documentation: "/api-docs",
    },
    "API is running",
  );
});

// 404 handler - must come before error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: "not_found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware - must be last
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
    apiVersion,
  });
});
