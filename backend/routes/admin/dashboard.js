import adminDashboardController from "../../controllers/admin/adminDashboardController.js";
import express from "express"
import isAuthenticated from "../../middleware/authenticate.js";

let router = express.Router();

router.get('/auth/admin/dashboard', isAuthenticated, adminDashboardController);

export default router;