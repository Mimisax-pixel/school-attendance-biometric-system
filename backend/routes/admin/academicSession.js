import express from "express";

import { createAcademicSession} from "../../controllers/admin/academicSession.js";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

const router = express.Router();

// Create a new academic session (admin only)
router.post(
    "/create-academic-session",
    isAuthenticated,
    isRole(["admin", "lecturer"]),
    createAcademicSession
);

export default router;