import express from "express";
import { registerLecturer } from "../../controllers/admin/lecturer.controller.js";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

let router = express.Router();

router.post("/lecturer/register", isAuthenticated,isRole("admin"), registerLecturer);

export default router;