import express from "express";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";
import {
  createSession,
  getSessions,
  fetchStudentDetails,
  checkIn,
} from "../../controllers/lecturer/session.js";

const router = express.Router();

// Create a new session
router.post("/session", isAuthenticated, isRole("lecturer"), createSession);
// Get all sessions
router.get("/sessions", isAuthenticated, isRole("lecturer"), getSessions);
router.get(
  "/session/lecturer-sessions",
  isAuthenticated,
  isRole("lecturer"),
  getSessions
);
router.post(
  "/session/student_details",
  isAuthenticated,
  isRole("lecturer"),
  fetchStudentDetails
);
router.post(
  "/session/checkin",
  isAuthenticated,
  isRole(["lecturer", "student"]),
  checkIn
);
export default router;
