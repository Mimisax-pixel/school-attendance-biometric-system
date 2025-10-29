import express from "express";
import {
  addNewCourse,
  deleteCourse,
  editCourses,
  getCourses,
} from "../../controllers/admin/courses.js";
import isRole from "../../middleware/verifyrole.js";
import isAuthenticated from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/courses", isAuthenticated,isRole("admin"), getCourses);
router.get("/courses/:course_code",isRole("admin"), isAuthenticated, getCourses);
router.post("/course", isAuthenticated,isRole("admin"), addNewCourse);
router.patch("/courses/edit", isAuthenticated,isRole("admin"), editCourses);
router.delete("/courses/:courseid", isAuthenticated,isRole("admin"), deleteCourse);

export default router;
