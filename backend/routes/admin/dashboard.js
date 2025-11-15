import adminDashboardController from "../../controllers/admin/adminDashboardController.js";
import { computeAttendanceRatesEndpoint } from "../../controllers/admin/computeAttendance.js";
import express from "express"
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

let router = express.Router();

router.get('/auth/admin/dashboard', isAuthenticated,isRole("admin"), adminDashboardController);
router.post('/auth/admin/compute-attendance-rates', isAuthenticated, isRole("admin"), computeAttendanceRatesEndpoint);

export default router;