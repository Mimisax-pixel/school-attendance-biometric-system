import express from "express";
import registerAdmin from "../../controllers/admin/register.js";
import loginadmin from "../../controllers/admin/Login.js";
const router = express.Router();

// Route to get admin dashboard data
// router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginadmin);

export default router;