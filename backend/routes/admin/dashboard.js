import adminDashboardController from "../../controllers/admin/adminDashboardController.js";
import express from "express"
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

let router = express.Router();

router.get('/auth/admin/dashboard', isAuthenticated,isRole("admin"), adminDashboardController);

export default router;