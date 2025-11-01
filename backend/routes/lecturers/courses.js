import express from "express"
import { getCourses } from "../../controllers/lecturer/courses.js";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

const router = express.Router();
router.post("/lecturer/courses", isAuthenticated, isRole("lecturer"), getCourses);

export default router;