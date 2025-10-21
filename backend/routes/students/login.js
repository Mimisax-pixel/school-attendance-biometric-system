import loginStudent from "../../controllers/students/register/login.js";
import express from "express";
import isAuthenticated from "../../middleware/authenticate.js";
const router = express.Router();

// Student login
router.post("/login/student", loginStudent);
router.get("/auth/student/check", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "Authenticated", isauthenticated: true });
});

export default router;
