import express from "express";
import {
  addNewCourse,
  deleteCourse,
  editCourses,
  getCourses,
} from "../../controllers/admin/courses.js";
import isAuthenticated from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/courses", isAuthenticated, getCourses);
router.get("/courses/:course_code", isAuthenticated, getCourses);
router.post("/course", isAuthenticated, addNewCourse);
router.patch("/courses/edit", isAuthenticated, editCourses);
router.delete("/courses/:courseid", isAuthenticated, deleteCourse);

export default router;
