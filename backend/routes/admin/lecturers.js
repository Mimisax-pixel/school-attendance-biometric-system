import express from "express";
import { registerLecturer } from "../../controllers/admin/lecturer.controller.js";
import isAuthenticated from "../../middleware/authenticate.js";

let router = express.Router();

router.post("/lecturer/register", isAuthenticated, registerLecturer);

export default router;