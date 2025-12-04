import express from "express";
import { sendAlert } from "../../controllers/admin/alertsController.js";
import isAuthenticated from "../../middleware/authenticate.js";

const router = express.Router();

// Send alert to students (admin only)
router.post("/send-alert", isAuthenticated, sendAlert);

export default router;
