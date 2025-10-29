import express from 'express'
import isAuthenticated from '../../middleware/authenticate.js';
import getStudentDashboard from '../../controllers/dashboard.controller.js';
import isRole from "../../middleware/verifyrole.js"
let router = express.Router();

// Route to get student dashboard data
router.get('/auth/student/dashboard', isAuthenticated, isRole("student"),getStudentDashboard)

export default router;