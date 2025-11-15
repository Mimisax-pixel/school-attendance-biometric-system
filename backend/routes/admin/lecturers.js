import express from "express";
import {
  registerLecturer,
  getLecturers,
  searchLecturers,
  updateLecturer,
  deleteLecturer,
} from "../../controllers/admin/lecturer.controller.js";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

let router = express.Router();

// Register a new lecturer (admin only)
router.post(
  "/lecturer/register",
  isAuthenticated,
  isRole("admin"),
  registerLecturer
);

// Fetch all lecturers (admin only)
router.get("/lecturers", isAuthenticated, isRole("admin"), getLecturers);

// Search lecturers by query (admin only) - ?q=term
router.get(
  "/lecturers/search",
  isAuthenticated,
  isRole("admin"),
  searchLecturers
);

// Update lecturer by id (admin only)
router.put("/lecturer/:id", isAuthenticated, isRole("admin"), updateLecturer);

// Delete lecturer by id (admin only)
router.delete(
  "/lecturer/:id",
  isAuthenticated,
  isRole("admin"),
  deleteLecturer
);

export default router;
