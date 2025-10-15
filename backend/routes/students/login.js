import loginStudent from "../../controllers/students/register/login.js";
import express from "express";
const router = express.Router();

// Student login
router.post("/login/student", loginStudent);

export default router;
