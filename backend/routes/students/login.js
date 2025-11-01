import loginStudent from "../../controllers/students/register/login.js";
import express from "express";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js"
const router = express.Router();

// Student login
router.post("/login/student", loginStudent);
router.get("/auth/verify", isAuthenticated, (req, res) => {
  console.log("route visited");
  
  res
    .status(200)
    .json({
      status: "success",
      message: "Authenticated",
      isauthenticated: true,
    });
});

export default router;
