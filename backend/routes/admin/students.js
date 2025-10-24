import express from "express"
import studentRecords from "../../controllers/admin/students.controller.js";

let router = express.Router();

router.get("/attendance-records", studentRecords);


export default router;