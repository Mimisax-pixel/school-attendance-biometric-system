import express from "express";
import loginLecturer from "../../controllers/lecturer/login.js";

let router = express.Router();

router.post("/lecturer/login", loginLecturer);

export default router;
