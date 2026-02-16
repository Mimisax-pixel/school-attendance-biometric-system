/**
 * Student Data Routes
 * Routes for fetching student-specific data
 */

import express from "express";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";
import {
  getStudentGrades,
  getStudentAttendanceRecords,
  getStudentCourses,
  getStudentPerformance,
} from "../../controllers/students/studentDataController.js";

const router = express.Router();

// Protected routes - require student authentication
router.get(
  "/student/grades",
  isAuthenticated,
  isRole("student"),
  getStudentGrades,
);

router.get(
  "/student/attendance",
  isAuthenticated,
  isRole("student"),
  getStudentAttendanceRecords,
);

router.get(
  "/student/courses",
  isAuthenticated,
  isRole("student"),
  getStudentCourses,
);

router.get(
  "/student/performance",
  isAuthenticated,
  isRole("student"),
  getStudentPerformance,
);

export default router;
