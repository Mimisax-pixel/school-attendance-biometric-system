import express from "express";
import loginLecturer from "../../controllers/lecturer/login.js";

let router = express.Router();

router.post("/login/lecturer", loginLecturer);

export default router;
