import express from "express";
import studentRecords from "../../controllers/admin/students.controller.js";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";

let router = express.Router();

router.get(
  "/attendance-records",
  isAuthenticated,
  isRole(["admin", "lecturer"]),
  studentRecords
);

export default router;
