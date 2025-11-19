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
router.get("/courses/:course_code", isAuthenticated,isRole("admin"), getCourses);
router.post("/course", isAuthenticated,isRole(["lecturer","admin"]), addNewCourse);
router.patch(
  ["lecturer", "admin"],
  isAuthenticated,
  isRole(["lecturer", "admin"]),
  editCourses
);
router.delete(
  "/courses/:courseid",
  isAuthenticated,
  isRole(["lecturer", "admin"]),
  deleteCourse
);

export default router;
