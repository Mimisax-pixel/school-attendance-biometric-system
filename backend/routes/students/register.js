import mongoose from "mongoose";
import express from "express";
import Student from "../../models/students.js";
import registerStudent from "../../controllers/students/register/register.js";
const router = express.Router();

// Register a new student
router.post("/register/student", registerStudent);

export default router;
